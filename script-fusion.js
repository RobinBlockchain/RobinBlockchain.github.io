ethereum.autoRefreshOnNetworkChange = false;
      var cryptoPlanet;
      var userAccount;


      function startApp() {
        var cryptoPlanetAddress = "0x49cc49a795C11d84E3519f71bF82836d4540ff13";
        var abi = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "_approved",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "planet1ID",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "planet2ID",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "time",
					"type": "uint256"
				}
			],
			"name": "Fusion",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "planetId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "planet1ID",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "planet2ID",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "univers",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "dna",
					"type": "uint256"
				}
			],
			"name": "NewPlanet",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "balance",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_planet1Id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_planet2Id",
					"type": "uint256"
				}
			],
			"name": "canFusion",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "uint32",
					"name": "_planet1ID",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "_planet2ID",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "_univers",
					"type": "uint32"
				},
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "createRandomPlanet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "fusionFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "getPlanetsByOwner",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_planetId",
					"type": "uint256"
				}
			],
			"name": "isFusioning",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isOwner",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_planetId",
					"type": "uint256"
				}
			],
			"name": "isReadyToFusion",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				}
			],
			"name": "ownerOf",
			"outputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "planetToOwner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "planets",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "dna",
					"type": "uint256"
				},
				{
					"internalType": "uint64",
					"name": "creationTime",
					"type": "uint64"
				},
				{
					"internalType": "uint32",
					"name": "readyTime",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "fusionState",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "planet1Id",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "planet2Id",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "univers",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "setFusionContractAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "val",
					"type": "uint256"
				}
			],
			"name": "setFusionFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];



  cryptoPlanet = new web3.eth.Contract(abi,cryptoPlanetAddress);
  cryptoPlanet.defaultChain = "kovan";

  let acc = null;
  (async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  acc = accounts[0];

  const balance = await web3.eth.getBalance(accounts[0]);
  console.log("balance", web3.utils.fromWei(balance, "ether"));
})();


 
    

    // var acc = null;
      //  web3.eth.getAccounts((err, res) => {                   
                   //console.log(res[0]);
        //           acc = res[0];                 
       // });  

  var accountInterval = setInterval(function () {
   
        if (acc != userAccount) {
          userAccount = acc;
                      
          getPlanetsByOwner(userAccount)
            .then(displayPlanets);
        }
  }, 100);

  }

  function getPlanetsByOwner(owner) {
    return cryptoPlanet.methods.getPlanetsByOwner(owner).call()
    }

  function getPlanetDetails(id) {
      return cryptoPlanet.methods.planets(id).call()
    }


  function displayPlanets(ids) {
      $("#listplanets").append(ids); 
      $("#planets").empty();
      $("#fillplanet1dropdown").empty();
      $("#fillplanet2dropdown").empty();

      for (id of ids) {
        

        d=0;
        getPlanetDetails(id)
          .then(function (planet) {


            $("#fillplanet1dropdown").append(`
                <li>${parseInt(ids[d])}</li>
              `);
            $("#fillplanet2dropdown").append(`
                <li>${parseInt(ids[d])}</li>
              `);
            
              /*
              $("#planets").append(`<div class="first nonhero">
                <img class="hero-profile-img" src="https://cryptoplanet.pythonanywhere.com/planets/${parseInt(ids[d])}/image" alt="">
                <div class="hero-description-bk"></div>
                <div class="hero-logo">
                <img src="https://e00-elmundo.uecdn.es/television/programacion-tv/img/programas/1f/1355295.png" alt="">
                </div>
                <div class="hero-description-1">
                <p>Iziborn</p>
                </div>
                <div class="hero-description-2">
                <p>Total hour focused :</p>
                </div>
                <div class="hero-description-3">
                  <p>Created : ${planet.creationTime}</p>
                </div>
                <div class="hero-btn-1">
                  <a href="#">Focus Boost</a>
                </div>
                <div class="hero-btn">
                  <a href="#">Learn More</a>
                </div>
                </div>`);
                */




             /*$("#planets").append(`<div class="planet"> 
              <ul>
                <li>DNA: ${planet.dna}</li>
                <li>Creation Time: ${planet.creationTime}</li>
                <li>Fusion State: ${planet.fusionState}</li>
                <li>Planet 1 : ${planet.planet1Id}</li>
                <li>Planet 2: ${planet.planet2Id}</li>
                <li>Univers: ${planet.univers}</li>
                <img src="https://cryptoplanet.pythonanywhere.com/planets/${parseInt(ids[d])}/image" style="max-width: 250px;"/>

              </ul>
            </div>`);*/
            d+=1;
          });
      } 
    }

    function createRandomPlanet() {


      $("#txStatus").text("Creating new planet on the blockchain. This may take a while...");

      return cryptoPlanet.methods.createRandomPlanet("Test",1,1,1,userAccount)
        .send({ from: userAccount })
        .on("receipt", function (receipt) {
          $("#txStatus").text("Successfully created " + "!");

          getPlanetsByOwner(userAccount).then(displayPlanets);
        })
        .on("error", function (error) {

          $("#txStatus").text(error);
        });
    }


    function TransferPlanet() {

      var addressto = document.getElementById("addressto").value;
   	  var planetId = document.getElementById("planetId").value;

      return cryptoPlanet.methods.transfer(addressto,planetId)
        .send({ from: userAccount })
        .on("receipt", function (receipt) {
          $("#txStatus").text("Successfully transferred " + "!");

          getPlanetsByOwner(userAccount).then(displayPlanets);
        })
        .on("error", function (error) {

          $("#txStatus").text(error);
        });
       

    }



    window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
        // Now you can start your app & access web3 freely:
        startApp()

     
        

      })


window.onload=function(){

var activeDropdown = {};
document.getElementById('planet1-dropdown').addEventListener('click',showDropdown);
document.getElementById('planet2-dropdown').addEventListener('click', showDropdown);  
document.getElementById ("button-fusion").addEventListener ("click", showFusion, false);


var planet1Fusion = "null";
var planet2Fusion = "null";

function showFusion() {
  console.log(planet1Fusion);
  console.log(planet2Fusion);
}


function showDropdown(event){
  if (activeDropdown.id && activeDropdown.id !== event.target.id) {
    activeDropdown.element.classList.remove('active');
  }
  //checking if a list element was clicked, changing the inner button value
  if (event.target.tagName === 'LI') {
    activeDropdown.button.innerHTML = event.target.innerHTML;
    if (activeDropdown.id == "planet1-dropdown"){
      planet1Fusion = event.target.innerHTML;
      
    }
    if (activeDropdown.id =="planet2-dropdown"){
      planet2Fusion = event.target.innerHTML;

      
     

     
    }
	if (planet1Fusion != "null" && planet2Fusion != "null") {
		
		$("#planet1display").empty();

      getPlanetDetails(planet1Fusion)
          .then(function (planet) {

             $("#planet1display").append(`<div class="first nonhero">
                <img class="hero-profile-img" src="https://cryptoplanet.pythonanywhere.com/planets/${planet1Fusion}/image" alt="">
                <div class="hero-description-bk"></div>
                <div class="hero-logo">
                <img src="https://e00-elmundo.uecdn.es/television/programacion-tv/img/programas/1f/1355295.png" alt="">
                </div>
                <div class="hero-description-1">
                <p>Iziborn</p>
                </div>
                <div class="hero-description-2">
                <p>Total hour focused :</p>
                </div>
                <div class="hero-description-3">
                  <p>Created : ${planet.creationTime}</p>
                </div>
                <div class="hero-btn-1">
                  <a href="#">Focus Boost</a>
                </div>
                <div class="hero-btn">
                  <a href="#">Learn More</a>
                </div>
                </div>`);
					 });
		
	getPlanetDetails(planet2Fusion)
          .then(function (planet) {

             $("#planet2display").append(`<div class="first nonhero">
                <img class="hero-profile-img" src="https://cryptoplanet.pythonanywhere.com/planets/${planet2Fusion}/image" alt="">
                <div class="hero-description-bk"></div>
                <div class="hero-logo">
                <img src="https://e00-elmundo.uecdn.es/television/programacion-tv/img/programas/1f/1355295.png" alt="">
                </div>
                <div class="hero-description-1">
                <p>Iziborn</p>
                </div>
                <div class="hero-description-2">
                <p>Total hour focused :</p>
                </div>
                <div class="hero-description-3">
                  <p>Created : ${planet.creationTime}</p>
                </div>
                <div class="hero-btn-1">
                  <a href="#">Focus Boost</a>
                </div>
                <div class="hero-btn">
                  <a href="#">Learn More</a>
                </div>
                </div>`);

      });

	 
	}

    for (var i=0;i<event.target.parentNode.children.length;i++){
      if (event.target.parentNode.children[i].classList.contains('check')) {
        event.target.parentNode.children[i].classList.remove('check');
      }
    }
    //timeout here so the check is only visible after opening the dropdown again
    window.setTimeout(function(){
          event.target.classList.add('check');
    },500)
  }
  for (var i = 0;i<this.children.length;i++){
    if (this.children[i].classList.contains('dropdown-selection')){
        activeDropdown.id = this.id;
        activeDropdown.element = this.children[i];
        this.children[i].classList.add('active');
     }
    //adding the dropdown-button to our object
    else if (this.children[i].classList.contains('dropdown-button')){
      activeDropdown.button = this.children[i];
    }
  }
}

window.onclick = function(event) {
  if (!event.target.classList.contains('dropdown-button')) {
    activeDropdown.element.classList.remove('active');
  }
}

}

