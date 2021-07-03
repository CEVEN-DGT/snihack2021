#include "oyanftmarket.hpp"

// --------------------------------------------------------------------------------------------------------------------
void cevenparksio::depositfund( const name& from_ac, 
								const name& contract_ac, 
								const asset& quantity,
								const string& memo 
								) {
	// check for conditions if either or both of these are true for `from_ac` & `to`
	// M-1: here, the msg will be printed on the console, provided print --to-console is activated on the used nodeos url
	if(contract_ac != get_self() ||  from_ac == get_self()) {		// atleast one of the condition is true
		print("Either money is not sent to the contract or contract itself is the buyer.");
		return;
	}

/*	// M-2: here, the contract ac can't be payer for RAM, CPU, NET then it will throw the error as eosio.token::transfer notifies this ACTION
	check( (contract_ac == get_self()) && (from_ac != get_self()), "Either money is not sent to the contract or contract itself is the sender.");
*/
	// Although this is checked in "eosio.token::transfer" action, but fund_token_symbol check is pending. 
	// So, in addition the entire asset check is done using static func defined in "dciico.hpp" file.
	// check quantity is valid for all conditions as 'asset'
	// check_quantity(quantity, fund_token_symbol, native_token_symbol);

	// check (memo.size() == 12, "length of the string ")
	// check(is_account(name{memo}), "invalid username");

	fund_index fund_table(get_self(), get_self().value);
	auto fund_it = fund_table.find(from_ac.value);

	// update (emplace/modify) the deposit_qty
	if(account_it == fund_table.end()) {
		fund_table.emplace(get_self(), [&](auto& row) {
			row.username = from_ac;
			row.balances = map<extended_symbol, uint64_t>{
				make_pair(extended_symbol(quantity.symbol, get_first_receiver()), quantity.amount)
			};
		});
	} 
	else {
		fund_table.modify(account_it, get_self(), [&](auto& row) {
			creatify_balances_map(row.balances, quantity, 1, ""_n);		// 1 for add balance
		});
	}

}

// --------------------------------------------------------------------------------------------------------------------
// void oyanftmarket::withdrawfund( const name& from_ac,
// 								 const name& to_ac,
// 								 const asset& quantity,
// 								 const string& memo
// 								)
// {
// 	require_auth(get_self());

// 	check( quantity.is_valid(), "invalid quantity" );
// 	check( quantity.amount > 0, "must withdraw positive quantity" );
//     check( memo.size() <= 256, "memo has more than 256 bytes" );

// 	// instantiate the `account` table
// 	fund_index fund_table(get_self(), get_self().value);
// 	auto fund_it = fund_table.find(from_ac.value);

// 	check(frm_account_it != account_table.end(), "there is no account available for the given from_id.");

// 	// check the amount present in balances map's value
// 	check_amount_in_map( frm_account_it->balances, quantity );

//     // transfer quantity from oyanftmarket contract to to_ac
//     action(
// 		permission_level{get_self(), "active"_n},
// 		capture_contract_in_map(frm_account_it->balances, quantity),
// 		"transfer"_n,
// 		std::make_tuple(get_self(), to_ac, quantity, memo)
// 	).send();

// 	// update (substract) the balances' value in from_id accounts table
// 	account_table.modify(frm_account_it, get_self(), [&](auto& row) {
// 		creatify_balances_map(row.balances, quantity, 0, "captract"_n);		// 0 for sub balance
// 	});

// 	// erase the from_id in accounts table due to zero balances' value
// 	// this is to save the contract's RAM space
// 	auto s_it = std::find_if(frm_account_it->balances.begin(), frm_account_it->balances.end(), 
// 							[&](auto& ms) {return ms.first.get_symbol() == quantity.symbol;});
		
// 	if(s_it != frm_account_it->balances.end()) {		// key found
// 		if (s_it->second == 0)			// if val == 0
// 			account_table.erase(frm_account_it);
// 	}	
// }

// --------------------------------------------------------------------------------------------------------------------
void cevenparksio::enterpark( const name& username,
								uint64_t park_id,
								bool is_checked_in 
								);
{
	require_auth(get_self());

	// check if the park_id exists
	parkinfo_index parkinfo_table(get_self(), get_self());
	auto parkinfo_it = parkinfo_table.find(park_id);

	check(parkinfo_it != parkinfo_table.end(), "park id doesn\'t exist");

	userentry_index userentry_table(get_self(), get_self());
	auto userentry_it = userentry_table.find(username.value);

	if (userentry_it == userentry_table.end()) {
		userentry_table.emplace(get_self(), [&](auto& row){
			row.username = username;
			row.is_checked_in = is_checked_in;
		});
	} else {
		userentry_table.modify(userentry_it, get_self(), [&](auto& row){
			row.is_checked_in = is_checked_in;
		});
	}
}

// --------------------------------------------------------------------------------------------------------------------
void cevenparksio::addparkdata( uint64_t tree_id,
								double lon,
								double lat,
								string species,
								string latin_species,
								uint16_t year_planted,
								float dbh,
								float height,
								float biomass
								) {
	require_auth(get_self());

	uint64_t park_id = 17'000'000'000'000'000'000 + (uint64_t)now();

	parkinfo_index parkinfo_table(get_self(), park_id);
	auto parkinfo_it = parkinfo_table.find(park_id);

	check(parkinfo_it == parkinfo_table.end(), "park id already exists, try again");

	parkinfo_table.emplace(get_self(), [&](auto& row){
		row.park_id = park_id;
		row.tree_id = tree_id;
		row.lon = lon;
		row.lat = lat;
		row.species = species;
		row.latin_species = latin_species;
		row.year_planted = year_planted;
		row.dbh = dbh;
		row.height = height;
		row.biomass = biomass;
	});
}

// --------------------------------------------------------------------------------------------------------------------
void cevenparksio::editparkdata( uint64_t park_id, 
								uint64_t tree_id,
								double lon,
								double lat,
								string species,
								string latin_species,
								uint16_t year_planted,
								float dbh,
								float height,
								float biomass
								) {
	require_auth(get_self());

	parkinfo_index parkinfo_table(get_self(), park_id);
	auto parkinfo_it = parkinfo_table.find(park_id);

	check(parkinfo_it != parkinfo_table.end(), "park id doesn\'t exist");

	// todo: check if the all data exist
	parkinfo_table.modify( parkinfo_it, get_self(), [&](auto& row){
		row.tree_id = tree_id;
		row.lon = lon;
		row.lat = lat;
		row.species = species;
		row.latin_species = latin_species;
		row.year_planted = year_planted;
		row.dbh = dbh;
		row.height = height;
		row.biomass = biomass;
	});
}




