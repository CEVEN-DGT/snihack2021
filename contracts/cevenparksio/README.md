# CEVEN.Parks

## Background
* Each user is identified by unique username(12 characters as per eosio naming convention).
* For the Hackathon, the account creation is not done for each user, just they are asked to give an non-existing username. But, later each account will be signing with their private key(securely stored via encryption/encoding with the platform).
* All the ACTIONs are permissioned by contract.

## ACTION
* `userentry`
* `addparkdata`
* `delparktree`
* `depostfund`
* `withdrawfund`

## TABLE
* `userentry` (scope: self)
	- username
	- is_checked_in (0: outside, 1: inside)
* `parkinfo` (scope: park_id)
	- tree_id
	- long
	- lat
	- species
	- latin_species
	- year_planted
	- diameter_canopy
	- dbh
	- height
	- biomass
* `fund` (scope: username)
	- deposit_qty

## Compile

## Deploy

## Testing

## References