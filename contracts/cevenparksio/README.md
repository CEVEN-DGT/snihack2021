# CEVEN.Parks

## Background
* Each user is identified by unique username(12 characters as per eosio naming convention).
* For the Hackathon, the account creation is not done for each user, just they are asked to give an non-existing username. But, later each account will be signing with their private key(securely stored via encryption/encoding with the platform).
* All the ACTIONs are permissioned by contract.

## ACTION
* `depostfund`
<!-- * `withdrawfund` -->
* `signup`
* `login`
* `addparkdata`
* `delparktree`
* `enterpark`

## TABLE
* `profile`
	- username
	- email_id
	- password_hash
	- is_logged_in
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
* deploy contract
```console
$ cleost set contract cevenparksio ./
Reading WASM from /mnt/f/Coding/github_repos/snihack2021/contracts/cevenparksio/cevenparksio.wasm...
Publishing contract...
executed transaction: 5ea53cdb43f1c5c981a0012476512c673f73fdc4205e02a7a8f7e59dc617a407  24432 bytes  1203 us
#         eosio <= eosio::setcode               {"account":"cevenparksio","vmtype":0,"vmversion":0,"code":"0061736d0100000001c1022e60000060037f7f7f0...
#         eosio <= eosio::setabi                {"account":"cevenparksio","abi":"0e656f73696f3a3a6162692f312e32000c0b6164647061726b64617461000907747...
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```
* Adding eosio.code to permissions (for inline actions)
```console
$ cleost set account permission cevenparksio active --add-code
executed transaction: e76b11a8bc3477798b706242e37fb673c88b76b39c2fbe47937aaa43b2caf39a  184 bytes  152 us
#         eosio <= eosio::updateauth            {"account":"cevenparksio","permission":"active","parent":"owner","auth":{"threshold":1,"keys":[{"key...
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```

## Testing
### ACTION - signup
* user signup
```console
$ cleost push action cevenparksio signup '["cpusr1111111", "abhi3700@gmail.com", "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76"]' -p cevenparksio@active
executed transaction: a3ca63bb0d0652f16b4ce3b5e908f3742c97c1417bf20466824b3afb8c3201df  152 bytes  261 us
#  cevenparksio <= cevenparksio::signup         {"username":"cpusr1111111","email_id":"abhi3700@gmail.com","password_hash":"48357a7f102bb38d88d1aa5b...
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```
* view table
```console
$ cleost get table cevenparksio cevenparksio profile --show-payer --lower cpusr1111111 --upper cpusr1111111
{
  "rows": [{
      "data": {
        "username": "cpusr1111111",
        "email_id": "abhi3700@gmail.com",
        "password_hash": "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76",
        "is_logged_in": 0
      },
      "payer": "cevenparksio"
    }
  ],
  "more": false,
  "next_key": "",
  "next_key_bytes": ""
}
```
* user signup again
```console
$ cleost -u http://jungle3.cryptolions.io:80 push action cevenparksio signup '["cpusr1111111", "abhi3700@gmail.com", "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76"]' -p cevenparksio@active
Error 3050003: eosio_assert_message assertion failure
Error Details:
assertion failure with message: username already exists. So, no signup needed.
pending console output:
```

### ACTION - login
* user login
```console
$ cleost push action cevenparksio logininout '["cpusr1111111", "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76", "1"]' -p cevenparksio@active
executed transaction: 301a54a47e4cda1e57bddda5fe9a94714ad975f892639f84b89571e92ceff171  136 bytes  243 us
#  cevenparksio <= cevenparksio::logininout     {"username":"cpusr1111111","password_hash":"48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4...
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```
* view table
```console
$ cleost get table cevenparksio cevenparksio profile --show-payer --lower cpusr1111111 --upper cpusr1111111
{
  "rows": [{
      "data": {
        "username": "cpusr1111111",
        "email_id": "abhi3700@gmail.com",
        "password_hash": "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76",
        "is_logged_in": 1
      },
      "payer": "cevenparksio"
    }
  ],
  "more": false,
  "next_key": "",
  "next_key_bytes": ""
}
```
* user login again & gets error as the user is already logged in
```console
$ cleost push action cevenparksio logininout '["cpusr1111111", "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76", "1"]' -p cevenparksio@active
Error 3050003: eosio_assert_message assertion failure
Error Details:
assertion failure with message: the parsed user login status is same as stored one.
pending console output:
```
* user logout
```console
$ cleost push action cevenparksio logininout '["cpusr1111111", "48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4a4017a76", "0"]' -p cevenparksio@active
executed transaction: 264cb2ce627f56585d7590932a6c20edc04eb73ce8b98ffa4c2197b7fe6ced3a  136 bytes  276 us
#  cevenparksio <= cevenparksio::logininout     {"username":"cpusr1111111","password_hash":"48357a7f102bb38d88d1aa5b7f887f70c0309f31a78cd57bf30e34e4...
warning: transaction executed locally, but may not be confirmed by the network yet         ]
```

### ACTION - addparkdata

### ACTION - editparkdata

### ACTION - delparktree

### ACTION - enterpark


## References