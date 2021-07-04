import json
import binascii
import requests
from getpass import getpass
from datetime import datetime, timedelta
from ueosio import sign_tx, DataStream, get_expiration, get_tapos_info, build_push_transaction_body
from Crypto.Hash import SHA256


# ======================================================================
chain_api_url = 'http://jungle3.cryptolions.io:80'      # Jungle Testnet
chain_name = 'jungle3'
chain_type = 'eos-testnet'
# chain_type = 'eos-mainnet'


# kycteosiobot eosio_ac
cp_eosio_ac = 'cevenparksio'
cp_ac_private_key = '5J88gBFpoJVSXwAanmbw544YGEKfcuhwnpAMZ3rE31jky7hC5cd'
cp_ac_key_perm = 'active'

# ACTION
addparkdata_action = 'addparkdata'
# del_action = 'editparkdata'
# setviews_action = 'setkycviews'

# ======================================================================
def addparkdata(
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
	tx = {
			"delay_sec":0,
			"max_cpu_usage_ms":0,
			"actions":[
				{
					"account": cp_eosio_ac,
					"name": addparkdata_action,
					"data":{
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
						},
					"authorization":[{"actor":cp_eosio_ac,"permission": cp_ac_key_perm}]
				}
			]
		}

	# Get chain info from a working api node
	info = requests.get(f'{chain_api_url}/v1/chain/get_info').json()
	ref_block_num, ref_block_prefix = get_tapos_info(info['last_irreversible_block_id'])
	chain_id = info['chain_id']

	# package transaction
	data = tx['actions'][0]['data']
	ds = DataStream()
	ds.pack_uint64(data['tree_id'])
	ds.pack_float(data['lon'])
	ds.pack_float(data['lon'])
	ds.pack_string(data['species'])
	ds.pack_string(data['latin_species'])
	ds.pack_uint16(data['year_planted'])
	ds.pack_float(data['diameter_canopy'])
	ds.pack_float(data['dbh'])
	ds.pack_float(data['height'])
	ds.pack_float(data['biomass'])

	tx['actions'][0]['data'] = binascii.hexlify(ds.getvalue()).decode('utf-8')

	tx.update({
		"expiration": get_expiration(datetime.utcnow(), timedelta(minutes=15).total_seconds()),
		"ref_block_num": ref_block_num,
		"ref_block_prefix": ref_block_prefix,
		"max_net_usage_words": 0,
		"max_cpu_usage_ms": 0,
		"delay_sec": 0,
		"context_free_actions": [],
		"transaction_extensions": [],
		"context_free_data": []
	})

	# Sign transaction
	tx_id, tx = sign_tx(
	   chain_id,
	   tx,
	   cp_ac_private_key
	)
	ds = DataStream()
	ds.pack_transaction(tx)
	packed_trx = binascii.hexlify(ds.getvalue()).decode('utf-8')
	tx = build_push_transaction_body(tx['signatures'][0], packed_trx)

	# Push transaction
	res = requests.post(f'{chain_api_url}/v1/chain/push_transaction', json=tx)

	return res



# ==============================================
# Calculate the SHA256 hash of any input
def get_hash_sha256(i):
	h = SHA256.new()
	h.update(bytes(i, 'utf-8'))
	empty_hash = h.hexdigest()
	return empty_hash


# ==============================================
# Main function
if __name__ == '__main__':
	res = addparkdata( 2,389813.1332, 5816624, "Silber-Linde", "Tilia tomentosa", 1976, 8, 38.19718634, 20, 15.98900346 )

	if res.status_code == 202:
		print(res.json()['transaction_id'])
	else:
		print(res.json()['error']['details'][0]['message'])