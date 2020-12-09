import {Entity, Value, ValueKind, store, BigInt} from "@graphprotocol/graph-ts";

export class TotalSupply extends Entity {
    constructor(id: string) {
        super();
        this.set("id", Value.fromString(id));
    }

    save(): void {
        let id = this.get("id");
        // @ts-ignore
        assert(id !== null, "Cannot save TotalSupply entity without an ID");
        // @ts-ignore
        assert(
            id.kind == ValueKind.STRING,
            "Cannot save TotalSupply entity with non-string ID. " +
            'Considering using .toHex() to convert the "id" to a string.'
        );
        store.set("TotalSupply", id.toString(), this);
    }

    static load(id: string): TotalSupply | null {
        return store.get("TotalSupply", id) as TotalSupply | null;
    }

    get id(): string {
        let value = this.get("id");
        return value.toString();
    }

    set id(value: string) {
        this.set("id", Value.fromString(value));
    }

    get supply(): BigInt {
        let value = this.get("supply");
        return value.toBigInt();
    }

    set supply(value: BigInt) {
        this.set("supply", Value.fromBigInt(value));
    }

    get distributed(): BigInt {
        let value = this.get("distributed");
        return value.toBigInt();
    }

    set distributed(value: BigInt) {
        this.set("distributed", Value.fromBigInt(value));
    }

    get burned(): BigInt {
        let value = this.get("burned");
        return value.toBigInt();
    }

    set burned(value: BigInt) {
        this.set("burned", Value.fromBigInt(value));
    }
}
