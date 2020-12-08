import { BigInt } from "@graphprotocol/graph-ts"
import {
  InxIeo,
  RestrictionsUpdated,
  Paused,
  Unpaused,
  PauserAdded,
  PauserRemoved,
  AccountLock,
  AccountRelease,
  TimelockerAdded,
  TimelockerRemoved,
  WhitelistUpdate,
  WhitelisterAdded,
  WhitelisterRemoved,
  Revoke,
  RevokerAdded,
  RevokerRemoved,
  OwnerAdded,
  OwnerRemoved,
  Transfer,
  Approval
} from "../generated/InxIeo/InxIeo"
import { ExampleEntity } from "../generated/schema"

export function handleRestrictionsUpdated(event: RestrictionsUpdated): void {
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
}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handlePauserAdded(event: PauserAdded): void {}

export function handlePauserRemoved(event: PauserRemoved): void {}

export function handleAccountLock(event: AccountLock): void {}

export function handleAccountRelease(event: AccountRelease): void {}

export function handleTimelockerAdded(event: TimelockerAdded): void {}

export function handleTimelockerRemoved(event: TimelockerRemoved): void {}

export function handleWhitelistUpdate(event: WhitelistUpdate): void {}

export function handleWhitelisterAdded(event: WhitelisterAdded): void {}

export function handleWhitelisterRemoved(event: WhitelisterRemoved): void {}

export function handleRevoke(event: Revoke): void {}

export function handleRevokerAdded(event: RevokerAdded): void {}

export function handleRevokerRemoved(event: RevokerRemoved): void {}

export function handleOwnerAdded(event: OwnerAdded): void {}

export function handleOwnerRemoved(event: OwnerRemoved): void {}

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}
