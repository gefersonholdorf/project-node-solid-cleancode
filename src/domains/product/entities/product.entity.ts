export interface ProductProps {
    id : string
    name : string
    price : number
    quantity : number
}

export class ProductEntity {

    private constructor(private props : ProductProps) {}

    public static build(name : string, price : number) {
        return new ProductEntity({
            id: crypto.randomUUID().toString(),
            name,
            price,
            quantity: 0
        })
    }

    public static with(props : ProductProps) {
        return new ProductEntity(props)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get price() {
        return this.props.price
    }

    public get quantity() {
        return this.props.quantity
    }

    public increaseQuantity(quantity : number) {
        this.props.quantity += quantity
    }

    public descreaseQuantity(quantity : number) {
        this.props.quantity -= quantity
    }
}