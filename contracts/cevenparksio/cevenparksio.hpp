#pragma once
#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <eosio/system.hpp>
// #include <eosio/crypto.hpp>
#include <string>
#include <vector>
#include <map>
#include <cstdlib>		// for strtoull
#include <algorithm>			// for std::find_if



using eosio::contract;
using eosio::print;
using eosio::name;
using eosio::multi_index;
using eosio::const_mem_fun;
using eosio::indexed_by;
using eosio::asset;
using eosio::check;
using eosio::permission_level;
using eosio::datastream;
using eosio::current_time_point;
using eosio::action;
using eosio::same_payer;
using eosio::symbol;
using eosio::extended_symbol;
// using eosio::require_recipient;
using eosio::checksum256;
// using eosio::action_wrapper;

using std::string;
using std::vector;
using std::map;
using std::make_pair;

CONTRACT cevenparksio : public contract {
public:
	using contract::contract;


	/**
	 * @brief - deposit money to the contract ac
	 * @details - deposit money to the contract ac with memo - telegram user_id e.g. 452435325
	 * 			- accepts any token i.e. EOSIO token e.g. "EOS", "TOE", "FUTBOL" created on a chain
	 * @param from - user account
	 * @param contract_ac - contract ac
	 * @param quantity - in eosio tokens - EOS, TOE, etc.
	 * @param memo - purpose which should include telegram user_id
	 */
	[[eosio::on_notify("eosio.token::transfer")]]
	void depositfund( const name& from_ac, 
						const name& contract_ac, 
						const asset& quantity,
						const string& memo 
						);

	/**
	 * @brief - withdraw amount
	 * @details - withdraw amount from_ac to to_ac
	 * 
	 * @param from_ac - from eosio account
	 * @param from_username - from telegram username
	 * @param to_ac - to eosio account
	 * @param quantity - qty
	 * @param memo - memo
	 */
	// void withdrawfund( const name& from_ac,
	// 					 const name& to_ac,
	// 					 const asset& quantity,
	// 					 const string& memo 
	// 					);

	/**
	 * @brief - add park data
	 * @details - Here, park data is to be added by creating a unique id (timestamp, hash).
	 * 
	 * @param tree_id - tree id 
	 * @param lon - tree id 
	 * @param lat - tree id 
	 * @param species - tree id 
	 * @param latin_species - tree id 
	 * @param year_planted - tree id 
	 * @param dbh - tree id 
	 * @param height - height
	 * @param biomass - biomass
	 * 
	 */
	void addparkdata( uint64_t tree_id,
						double lon,
						double lat,
						string species,
						string latin_species,
						uint16_t year_planted,
						float dbh,
						float height,
						float biomass
						);


	/**
	 * @brief - add park data
	 * @details - Here, park data is to be added
	 * 
	 * @param tree_id - tree id 
	 * @param lon - tree id 
	 * @param lat - tree id 
	 * @param species - tree id 
	 * @param latin_species - tree id 
	 * @param year_planted - tree id 
	 * @param dbh - tree id 
	 * @param height - height
	 * @param biomass - biomass
	 * 
	 */
	void editparkdata( uint64_t park_id,
						uint64_t tree_id,
						double lon,
						double lat,
						string species,
						string latin_species,
						uint16_t year_planted,
						float dbh,
						float height,
						float biomass
						);

	void delparktree( uint64_t park_id,
						uint64_t tree_id,
						);



	void enterpark( const name& username,
					uint64_t park_id,
					bool is_checked_in 
					);




	// scope: self
	TABLE userentry
	{
		name username;
		bool is_checked_in;			// (0: outside, 1: inside)

		auto primary_key() const { return username.value; }
	};

	using userentry_index = multi_index<"userentry"_n, userentry>;

	// scope: park_id 
	TABLE parkinfo
	{
		uint64_t park_id;		// used just as primary_key for enterpark ACTION
		uint64_t tree_id;
		double lon;
		double lat;
		string species;
		string latin_species;
		uint16_t year_planted;
		float dbh;
		float height;
		float biomass;

		auto primary_key() const { return park_id; }
	};

	using parkinfo_index = multi_index<"parkinfo"_n, parkinfo>;

	// scope: self
	TABLE fund
	{
		name username;
		/*
			[ 
				{ "key": { "symbol": "4,SOV", "contract": "sovmintofeos" }, "value": 30000 }, 
				{ "key": { "symbol": "4,FROG", "contract": "frogfrogcoin" }, "value": 3500000 }, 
				{ "key": { "symbol": "4,PEOS", "contract": "thepeostoken" }, "value": 100000 }, 
				{ "key": { "symbol": "4,KROWN", "contract": "krowndactokn" }, "value": 7169 } 
			]
			
			Here, quantity amount is 30000/10^4 = 3 i.e. asset is "3.0000 SOV"
		*/
		map<extended_symbol, uint64_t> balances; // map with extended_symbol, uint64_t

		auto primary_key() const { return deposit_qty.symbol.code().raw(); }
	};

	using fund_index = multi_index<"fund"_n, fund>;


}
