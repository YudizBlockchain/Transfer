import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../Account/Account.service';
import{ CustomerService } from './Customer.service';

import { NgForm } from '@angular/forms';
@Component({
	selector: 'app-Customer',
	templateUrl: './Customer.component.html',
  providers: [CustomerService]
})
export class CustomerComponent {
  private allAssets;
  private asset;
	private errorMessage;
  private transactionFrom;
  private owner1;
  private owner2;
    myForm: FormGroup;
private AccountTransferObj;
      private transactionID;

      ownerID = new FormControl("", Validators.required);
  ownersID = new FormControl("", Validators.required);
 energyValue = new FormControl("", Validators.required);
constructor(private serviceAccount:CustomerService, fb: FormBuilder){

  this.myForm = fb.group({

		  ownerID:this.ownerID,
		  ownersID:this.ownersID,
  energyValue:this.energyValue,
    });
console.log("form value:"+this.myForm);
};


ngOnInit(): void {
    this.transactionFrom  = false;
    this.loadAll()
    .then(() => {
            this.transactionFrom  = true;
    });

  }


    loadAll(): Promise<any> {
      let tempList = [];
      return this.serviceAccount.getAll()
      .toPromise()
      .then((result) => {
  			this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
          if(error == 'Server error'){
              this.errorMessage = "Could not connect to REST server. Please check your configuration details";
          }
          else if(error == '404 - Not Found'){
  				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
              this.errorMessage = error;
          }
      });
    }

		registerUser(form: NgForm): Promise<any>  {
		    console.log("sender:"+form.value.sender);
				    console.log("receiver:"+form.value.receiver);
						    console.log("money:"+form.value.money);

								this.AccountTransferObj = {
									$class: "test.AccountTransfer",
									"from": form.value.sender,
									"to": form.value.receiver,
									"amount": form.value.money,

								}             
									console.log("sending:"+this.AccountTransferObj);


								return this.serviceAccount.accountTransfer(this.AccountTransferObj)
												.toPromise()
												.then((result) => {
													this.errorMessage = null;
													this.transactionID = result.transactionId;
													console.log(this.transactionID)
												console.log(result)
												})
												.catch((error) => {
														if(error == 'Server error'){
																this.errorMessage = "Could not connect to REST server. Please check your configuration details";
														}
														else if(error == '404 - Not Found'){
														this.errorMessage = "404 - Could not find API route. Please check your available APIs."
														}
														else{
																this.errorMessage = error;
														}
												}).then(() => {
													this.transactionFrom = false;
												});

		  }


execute(form: NgForm): Promise<any> {

var sender;
var receiver ;
var money ;

console.log('assets:'+form.value+"   res:"+receiver+"   money"+money);


	for (let asset of this.allAssets) {
		console.log(asset.accountId);
		console.log("evalue:"+this.energyValue.value);

		if(asset.accountId == "abc"){
			sender = asset.accountId;
		}
		if(asset.accountId == "xyz"){
			receiver = asset.accountId;
		}
	}

	console.log("owner1 :"+this.owner1.from);
		console.log("owner2 :"+this.owner2.value);
	this.AccountTransferObj = {
    $class: "test.AccountTransfer",
    "from": sender,
    "to": receiver,
    "amount": this.energyValue.value,

  }

	return this.serviceAccount.accountTransfer(this.AccountTransferObj)
					.toPromise()
					.then((result) => {
						this.errorMessage = null;
						this.transactionID = result.transactionId;
						console.log(this.transactionID)
					console.log(result)
					})
					.catch((error) => {
							if(error == 'Server error'){
									this.errorMessage = "Could not connect to REST server. Please check your configuration details";
							}
							else if(error == '404 - Not Found'){
							this.errorMessage = "404 - Could not find API route. Please check your available APIs."
							}
							else{
									this.errorMessage = error;
							}
					}).then(() => {
						this.transactionFrom = false;
					});


}


    //execute transaction
  /*execute(form: any): Promise<any> {

    console.log(this.allAssets)

    //get producer and consumer resident
    for (let asset of this.allAssets) {
      console.log(asset.accountId);

      if(asset.accountId == this.ownerID.value){
        this.owner1 = asset;
      }
      if(asset.accountId == this.ownersID.value){
        this.owner2 = asset;
      }
    }

  }

  this.AccountTransferObj = {
    $class: "test.AccountTransfer",
    "from": this.ownerID.value,
    "to": this.ownersID.value,
    "amount": this.producerResident.coins,

  };*/
}
