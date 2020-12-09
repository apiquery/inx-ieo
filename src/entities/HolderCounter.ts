import {Entity, Value, ValueKind, store} from "@graphprotocol/graph-ts";

export class HolderCounter extends Entity {
    constructor(id: string) {
        super();
        this.set("id", Value.fromString(id));
    }

    save(): void {
        let id = this.get("id");
        // @ts-ignore
        assert(id !== null, "Cannot save HolderCounter entity without an ID");
        // @ts-ignore
        assert(
            id.kind == ValueKind.STRING,
            "Cannot save HolderCounter entity with non-string ID. " +
            'Considering using .toHex() to convert the "id" to a string.'
        );
        store.set("HolderCounter", id.toString(), this);
    }

    static load(id: string): HolderCounter | null {
        return store.get("HolderCounter", id) as HolderCounter | null;
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
}
