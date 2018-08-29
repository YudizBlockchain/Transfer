'use strict';
/**
 * Write your transction processor functions here
 */

 /**
 * Sample transaction
 * @param {test.AccountTransfer} accountTransfer
 * @transaction
 */
 function accountTransfer(accountTransfer) {
 accountTransfer.from.balance -= accountTransfer.amount;
 accountTransfer.to.balance += accountTransfer.amount;
 return getAssetRegistry('test.Account')
 .then (function (assetRegistry) {
 return assetRegistry.update(accountTransfer.from);
 })
 .then (function () {
 return getAssetRegistry('test.Account');
 })
 .then(function (assetRegistry) {
 return assetRegistry.update(accountTransfer.to);
 });
 }
