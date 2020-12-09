import {Entity, Value, ValueKind, store, BigInt} from "@graphprotocol/graph-ts";

export class TransferCounter extends Entity {
    constructor(id: string) {
        super();
        this.set("id", Value.fromString(id));
    }

    save(): void {
        let id = this.get("id");
        // @ts-ignore
        assert(id !== null, "Cannot save TransferCounter entity without an ID");
        // @ts-ignore
        assert(
            id.kind == ValueKind.STRING,
            "Cannot save TransferCounter entity with non-string ID. " +
            'Considering using .toHex() to convert the "id" to a string.'
        );
        store.set("TransferCounter", id.toString(), this);
    }

    static load(id: string): TransferCounter | null {
        return store.get("TransferCounter", id.toLowerCase()) as TransferCounter | null;
    }

    get id(): string {
        let value = this.get("id");
        return value.toString();
    }

    set id(value: string) {
        this.set("id", Value.fromString(value));
    }

    // @ts-ignore
    get count(): i32 {
        let value = this.get("count");
        return value.toI32();
    }

    // @ts-ignore
    set count(value: i32) {
        this.set("count", Value.fromI32(value));
    }

    get totalTransferred(): BigInt {
        let value = this.get("totalTransferred");
        return value.toBigInt();
    }

    set totalTransferred(value: BigInt) {
        this.set("totalTransferred", Value.fromBigInt(value));
    }
}
