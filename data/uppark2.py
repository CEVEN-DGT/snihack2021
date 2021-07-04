'''
    M-1: Using Python -> User-A (with telegram_id) tips EOSIO tokens (EOS, FUTBOL,...) to User-B (with telegram_id) from balances maintained in cevenparksio contract ac
    M-2: Using cleos -> cleost push action cevenparksio tip '["145624324", "768743431", "ali67", "ali68", "0.0001 FUTBOL", "tip for enjoy"]' -p cevenparksio@active

    References: https://github.com/ulamlabs/aioeos/blob/master/aioeos/contracts/eosio_token.py
'''

import asyncio

from aioeos import EosAccount, EosJsonRpc, EosTransaction
from aioeos.contracts import eosio_token
from aioeos.exceptions import EosAssertMessageException
from aioeos import types
import pandas as pd

import json

df = pd.read_csv("./victoriaparktrees.csv")
tree_id = df['TreeID'].to_list()
lon = df['long'].to_list()
lat = df['lat'].to_list()
species = df['species'].to_list()
latin_species = df['latin species'].to_list()
year_planted = df['year planted'].to_list()
diameter_canopy = df['diameter canopy'].to_list()
dbh = df['dbh'].to_list()
height = df['height'].to_list()
biomass = df['biomass'].to_list()

print(tree_id[0])

async def addparkdata(
        park_id,
        tree_id,
        lon,
        lat,
        species,
        latin_species,
        year_planted,
        diameter_canopy,
        dbh,
        height,
        biomass
    ):
    contract_account = EosAccount(
      name='cevenparksio',
      private_key='5J88gBFpoJVSXwAanmbw544YGEKfcuhwnpAMZ3rE31jky7hC5cd'
    )

    action = types.EosAction(
        account='cevenparksio',
        name='addparkdata',
        authorization=[contract_account.authorization('active')],
        data={
            'park_id': park_id,
            'tree_id': tree_id,
            'lon': lon,
            'lat': lat,
            'species': species,
            'latin_species': latin_species,
            'year_planted': year_planted,
            'diameter_canopy': diameter_canopy,
            'dbh': dbh,
            'height': height,
            'biomass': biomass
        }
    )

    rpc = EosJsonRpc(url='http://jungle3.cryptolions.io:80')
    block = await rpc.get_head_block()

    transaction = EosTransaction(
      ref_block_num=block['block_num'] & 65535,
      ref_block_prefix=block['ref_block_prefix'],
      actions=[action]
    )

    response = await rpc.sign_and_push_transaction(
      transaction, keys=[contract_account.key]
    )
    print(response)             # print the full response after SUCCESS
    
    response = str(response).replace("\'", "\"")            # replace single quotes (') with double quotes (") to make it as valid JSON & then extract the 'message' value.
    # print(response)               # print the full response after replacing single with double quotes
    '''
        Here, as the response o/p is not a valid JSON giving error like this:
        Error:
            Parse error on line 1:
            ...producer_block_id": None, "receipt": {"s
            -----------------------^
            Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'undefined'

        So, capture txn_id by char no. i.e. {"transaction_id": "14e310c6e296560202ec808139d7e1b06901616f35b5c4a36ee0a4f065ec72a6"
    '''
    print(f"\nthe txn_id is: {response[20:84]}")          # print the txn_id for successful transaction





# SUCCESS
try:
    # asyncio.get_event_loop().run_until_complete(addparkdata( 2,389813.1332, 5816624, "Silber-Linde", "Tilia tomentosa", 1976, 8, 38.19718634, 20, 15.98900346 ))
    for i in range(0, 10):    
        asyncio.get_event_loop().run_until_complete(addparkdata(
            17000000001625384306,
            tree_id[i],
            lon[i],
            lat[i],
            species[i],
            latin_species[i],
            year_planted[i],
            diameter_canopy[i],
            dbh[i],
            height[i],
            biomass[i]
            ))

# FAIL: to check this, parse "0.001 FUTBOL" instead of "0.0001 FUTBOL" i.e. precision error.
except EosAssertMessageException as e:
    e = str(e).replace("\'", "\"")            # replace single quotes (') with double quotes (") to make it as valid JSON & then extract the 'message' value.
    # print(f'{e}')      # print full error dict
    print(f"{json.loads(e)['details'][0]['message']}")          # print the message


# for i in range(1, 11):
#     print(i)
