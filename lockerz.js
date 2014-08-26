// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// CONCEPTUAL THINKING //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// Customers leave bags with concierge
	// Added with checkIn function
		// Sets name and weight of bags

// Concierge uses program to determine which locker to place the bag
	// addToLocker function checks weight of bags and determines size of locker

// Program tells the concierge the number of the locker to place the bag
	// For loop in addToLockers method determines first available locker

// Program prints a ticket to give to the customer
	// addToLockers function sets values of currentTicket (to be printed)
// Upon return of the ticket, the concierge uses that to look up the corresponding locker
	// checkOut function checks ticket values to determine what bags to remove
// Retrieve the bag and return it to the customer
	// checkOut function uses values to retrieve bags and then remove from array

// There are 1000 small lockers, 1000 medium, and 1000 large
	// Small lockers = weight 0-10
	// Medium lockers = weight 10-20
	// Large lockers = weight 21+

// Should assign the smallest available locker that fits the bag
	// For loop in addToLockers method determines first available locker in the smallest size

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


// ~~~~~~~~~~~~~~~~~~ //
// Lockers Arrays     //
// ~~~~~~~~~~~~~~~~~~ //

// Define array to put list of locker objects
var lockers = [];

// Define small, medium, and large locker arrays to later be pushed to parent lockers array
var small = [];
var medium = [];
var large = [];

// Push small, medium, and large locker arrays to parent lockers array
lockers.push(small, medium, large);

// Define variables to access small, medium, and large lockers more easily
var smallLockers = lockers[0];
var mediumLockers = lockers[1];
var largeLockers = lockers[2];


// ~~~~~~~~~~~~~~~~~~ //
// Individual Lockers //
// ~~~~~~~~~~~~~~~~~~ //

// Define current ticket to print to customer
var currentTicket = [];

// Define Locker prototype
function Locker(owner,weight) {
	// Set owner to provided owner, by default there is no owner
	this.owner = owner;
	// Set weight of bags
	this.weight = weight;
}

// Add functions to Locker class/prototype
Locker.prototype = {
	// Add checkIn function to the Locker class for when a customer arrives
	checkIn: function(name, weight) {
		// Throw error if no name/owner is passed
		if (!name)
			throw new Error("missing owner of locker");
		// Set new owner of locker
		this.owner = name;
		// Set vacancy of locker to false
		this.vacant = false;
		// Throw Eror if no weight is passed
		if (!weight)
			throw new Error("missing weight of bags");
		// Set weight of bags
		this.weight = weight;
	},
	// Add checkOut function to the Locker class for when a customer leaves
	checkOut: function(size, number) {
		//if(this.weight < 11) {
		//	var index = smallLockers.indexOf(this);
		//	smallLockers[index] = undefined;
		//}
		if (size === "small") {
			smallLockers[number] = undefined;
		}
		if (size === "medium") {
			mediumLockers[number] = undefined;
		}
		if (size === "large") {
			largeLockers[number] = undefined;
		}
	},
	// Add function to check weight of bags and add to next available locker
	addToLocker: function() {
		// Define addedToLocker variable to check if added
		var addedToLocker = false;
		// Define Ticket to print after adding
		var ticket;
		// Check weight of bags
		if(this.weight < 11) {
		// If bags are small in weight
			// Find first available locker in small lockers array
			// Loop through smallLocker array, push to first empty index
			for(i = 0; i < 1000; i++) {
				if(smallLockers[i] === undefined) {
					// Push to small lockers array
					smallLockers.push(this);
					// Stop for loop
					i = 1000;
					// If added, set to true
					addedToLocker = true;
					// Print ticket
					currentTicket[0] = "small";
					currentTicket[1] = i;
				}
			}
			
		} 

		if(addedToLocker === false && this.weight < 21) {
		// If bags are medium in weight (or) small but small lockers are full
			// Find first available locker in medium lockers array
			// Loop through mediumLocker array, push to first empty index
			for(i = 0; i < 1000; i++) {
				if(mediumLockers[i] === undefined) {
					// Push to medium lockers array
					mediumLockers.push(this);
					// Stop for loop
					i = 1000;
					// If added, set to true
					addedToLocker = true;
					// Print ticket
					currentTicket[0] = "medium";
					currentTicket[1] = i;
				}
			}
					
		} 

		if(addedToLocker === false) {
		// If bags are large in weight (or) small/medium but small/medium lockers are full
			// Find first available locker in large lockers array
			// Loop through largeLocker array, push to first empty index
			for(i = 0; i < 1000; i++) {
				if(largeLockers[i] === undefined) {
					// Push to large lockers array
					largeLockers.push(this);
					// Stop for loop
					i = 1000;
					// If added, set to true
					addedToLocker = true;
					// Print ticket
					currentTicket[0] = "large";
					currentTicket[1] = i;
				}
			}

			if (addedToLocker === false) {
				throw new Error("No lockers available!");
			}
		}
		
	},

};