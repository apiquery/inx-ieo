import {Entity, Value, ValueKind, store, BigInt} from "@graphprotocol/graph-ts";

export class Holder extends Entity {
    constructor(id: string) {
        super();
        this.set("id", Value.fromString(id));
    }

    save(): void {
        let id = this.get("id");
        // @ts-ignore
        assert(id !== null, "Cannot save Holder entity without an ID");
        // @ts-ignore
        assert(
            id.kind == ValueKind.STRING,
            "Cannot save Holder entity with non-string ID. " +
            'Considering using .toHex() to convert the "id" to a string.'
        );
        store.set("Holder", id.toString(), this);
    }

    static load(id: string): Holder | null {
        return store.get("Holder", id) as Holder | null;
    }

    get id(): string {
        let value = this.get("id");
        return value.toString();
    }

    set id(value: string) {
        this.set("id", Value.fromString(value));
    }

    get address(): string {
        let value = this.get("address");
        return value.toString();
    }

    set address(value: string) {
        this.set("address", Value.fromString(value));
    }

    get balance(): BigInt {
        let value = this.get("balance");
        return value.toBigInt();
    }

    set balance(value: BigInt) {
        this.set("balance", Value.fromBigInt(value));
    }

    // @ts-ignore
    get transactionCount(): i32 {
        let value = this.get("transactionCount");
        return value.toI32();
    }

    // @ts-ignore
    set transactionCount(value: i32) {
        this.set("transactionCount", Value.fromI32(value));
    }

    get isContract(): boolean {
        let value = this.get("isContract");
        return value.toBoolean();
    }

    set isContract(value: boolean) {
        this.set("isContract", Value.fromBoolean(value));
    }
}
