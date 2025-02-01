import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domains/product/gateway/product.gateway";
import { ProductEntity } from "../../../domains/product/entities/product.entity";

export class ProductRepository implements ProductGateway {

    private constructor(private readonly prismaClient : PrismaClient) {}

    public static build(prismaClient : PrismaClient) {
        return new ProductRepository(prismaClient)
    }

    public async save(product: ProductEntity): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }

        await this.prismaClient.product.create({
            data
        })
    }
    public async list(): Promise<ProductEntity[]> {
        const products = await this.prismaClient.product.findMany()

        const productList = products.map((p) => {
            const product = ProductEntity.with({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity
            })

            return product
        })

        return productList
    }

}