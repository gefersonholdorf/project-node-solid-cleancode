import { ApiExpress } from "./infra/api/express/routes/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.route";
import { ProductRepository } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUseCase } from "./usecases/product/create-product/create-product.usecase";
import { ListProductUseCase } from "./usecases/product/list-product/list-product";

function main() {
    const repository = ProductRepository.build(prisma)

    const createProductUserCase = CreateProductUseCase.build(repository)
    const listProductUserCase = ListProductUseCase.build(repository)

    const createProductRoute = CreateProductRoute.build(createProductUserCase)
    const listProductRoute = ListProductRoute.build(listProductUserCase)

    const api = ApiExpress.build([createProductRoute, listProductRoute])

    const port = 8000

    api.start(port)
}

main()