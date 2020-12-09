import {BigInt} from "@graphprotocol/graph-ts"
import {Transfer} from './entities/InxIeo/InxIeo';
import {Holder} from './entities/Holder';
import {HolderCounter} from './entities/HolderCounter';
import {TransferCounter} from './entities/TransferCounter';
import {TotalSupply} from './entities/TotalSupply';

export function handleTransfer(event: Transfer): void {
    let day = (event.block.timestamp / BigInt.fromI32(60 * 60 * 24));

    let holderFrom = Holder.load(event.params.from.toHex());
    if (holderFrom == null) {
        holderFrom = newHolder(event.params.from.toHex(), event.params.from.toHex());
    }
    holderFrom.balance = holderFrom.balance - event.params.value;
    holderFrom.transactionCount = holderFrom.transactionCount + 1;
    holderFrom.save();

    let holderTo = Holder.load(event.params.to.toHex());
    if (holderTo == null) {
        holderTo = newHolder(event.params.to.toHex(), event.params.to.toHex());

        // HolderCounter
        let holderCounter = HolderCounter.load('singleton');
        if (holderCounter == null) {
            holderCounter = new HolderCounter('singleton');
            holderCounter.count = 1;
        } else {
            holderCounter.count = holderCounter.count + 1;
        }
        holderCounter.save();
        holderCounter.id = day.toString();
        holderCounter.save();
    }
    holderTo.balance = holderTo.balance + event.params.value;
    holderTo.transactionCount = holderTo.transactionCount + 1;
    holderTo.save();

    // Transfer counter total and historical
    let transferCounter = TransferCounter.load('singleton')
    if (transferCounter == null) {
        transferCounter = new TransferCounter('singleton')
        transferCounter.count = 0
        transferCounter.totalTransferred = BigInt.fromI32(0)
    }
    transferCounter.count = transferCounter.count + 1
    transferCounter.totalTransferred = transferCounter.totalTransferred + event.params.value
    transferCounter.save()
    transferCounter.id = day.toString()
    transferCounter.save()
}

function newHolder(id: string, address: string): Holder {
    let holder = new Holder(id);
    holder.address = address;
    holder.balance = BigInt.fromI32(0);
    holder.transactionCount = 0;
    holder.isContract = false;
    return holder;
}

/*export function handleRestrictionsUpdated(event: RestrictionsUpdated): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = ExampleEntity.load(event.transaction.from.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new ExampleEntity(event.transaction.from.toHex())

        // Entity fields can be set using simple assignments
        entity.count = BigInt.fromI32(0)
    }

    // BigInt and BigDecimal math are supported
    entity.count = entity.count + BigInt.fromI32(1)

    // Entity fields can be set based on event parameters
    entity.newRestrictionsAddress = event.params.newRestrictionsAddress
    entity.updatedBy = event.params.updatedBy

    // Entities can be written to the store with `.save()`
    entity.save()

    // Note: If a handler doesn't require existing field values, it is faster
    // _not_ to load the entity from the store. Instead, create it fresh with
    // `new Entity(...)`, set the fields that should be updated and save the
    // entity back to the store. Fields that were not set or unset remain
    // unchanged, allowing for partial updates to be applied.

    // It is also possible to access smart contracts from mappings. For
    // example, the contract that has emitted the event can be connected to
    // with:
    //
    // let contract = Contract.bind(event.address)
    //
    // The following functions can then be called on this contract to access
    // state variables and other data:
    //
    // - contract.release(...)
    // - contract.getRestrictionsAddress(...)
    // - contract.name(...)
    // - contract.detectTransferFromRestriction(...)
    // - contract.approve(...)
    // - contract.isTimelocker(...)
    // - contract.totalSupply(...)
    // - contract.transferFrom(...)
    // - contract.setWhitelist(...)
    // - contract.isOwner(...)
    // - contract.decimals(...)
    // - contract.increaseAllowance(...)
    // - contract.isPauser(...)
    // - contract.paused(...)
    // - contract.getWhitelistData(...)
    // - contract.balanceOf(...)
    // - contract.isWhitelister(...)
    // - contract.messageForTransferRestriction(...)
    // - contract.symbol(...)
    // - contract.checkWhitelists(...)
    // - contract.checkLockup(...)
    // - contract.whitelist(...)
    // - contract.decreaseAllowance(...)
    // - contract.transfer(...)
    // - contract.checkTimelock(...)
    // - contract.detectTransferRestriction(...)
    // - contract.getWhitelistStatus(...)
    // - contract.updateTransferRestrictions(...)
    // - contract.allowance(...)
    // - contract.lock(...)
    // - contract.revoke(...)
    // - contract.isRevoker(...)
}*/
