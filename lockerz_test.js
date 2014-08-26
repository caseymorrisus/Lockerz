var expect = chai.expect;

// ~~~~~~~~~~~~~~~~~~~~//
// TESTING HELPERS     //
// ~~~~~~~~~~~~~~~~~~~~//
var fullLocker = [];
for(i = 0; i < 1000; i++) {
	fullLocker.push([]);
}

var resetLockers = function() {
	smallLockers = [];
	mediumLockers = [];
	largeLockers = [];
}
// ~~~~~~~~~~~~~~~~~~~~//


describe("Lockers", function() {
	var locker = new Locker();

	describe("List of lockers", function() {
		it("Should contain three arrays for small, medium, and large lockers", function(){
			expect(lockers.length).to.equal(3);
		});

		describe("Small lockers", function() {
			it("Should be empty by default", function() {
				expect(smallLockers.length).to.equal(0);
			});
		});

		describe("Medium lockers", function() {
			it("Should be empty by default", function() {
				expect(mediumLockers.length).to.equal(0);
			});
		});

		describe("Large lockers", function() {
			it("Should be empty by default", function() {
				expect(largeLockers.length).to.equal(0);
			});
		});
	});

	describe("Individual lockers", function() {
		it("Should not have a default name", function() {
			expect(locker.owner).to.equal(undefined);
		});

		it("Should be able to set name manually", function() {
			var locker = new Locker("Casey");
			expect(locker.owner).to.equal("Casey");
		});

		it("Should not have a default weight", function() {
			expect(locker.weight).to.equal(undefined);
		});

		it("Should be able to set weight manually", function() {
			var locker = new Locker("Casey", 10);
			expect(locker.weight).to.equal(10);
		});

		describe("checkIn function", function() {
			it("Should throw an error if no name is passed in", function() {
				expect(function() {
					(new Locker()).checkIn();
				}).to.throw(Error);
			});

			it("Should change owner of locker to name of customer", function() {
				locker.checkIn("Casey", 10);
				expect(locker.owner).to.equal("Casey");
			});

			it("Should throw an error if no weight is passed in", function() {
				expect(function() {
					(new Locker()).checkIn("Casey");
				}).to.throw(Error);
			});

			it("Should change weight to weight of bags", function() {
				locker.checkIn("Casey", 10);
				expect(locker.weight).to.equal(10);
			});
		});

		describe("checkOut function", function() {
			it("should remove locker array from parent array depending on ticket information", function() {
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				var locker2 = new Locker("Steve", 10);
				locker2.addToLocker();
				locker.checkOut("small", 0);
				expect(smallLockers[0]).to.equal(undefined);
				resetLockers();
			});
		});

		describe("addToLocker function", function() {
			it("Should add small bags to small locker array", function() {
 				var locker = new Locker("Casey", 10);
 				locker.addToLocker();
 				expect(smallLockers.length).to.equal(1);
 				resetLockers();
			});

			it("Should add medium bags to medium locker array", function() {
				var locker = new Locker("Casey", 11);
				locker.addToLocker();
				expect(mediumLockers.length).to.equal(1);
				resetLockers();
			});

			it("Should add large bags to large locker array", function() {
				var locker = new Locker("Casey", 21);
				locker.addToLocker();
				var locker2 = new Locker("John", 21);
				locker2.addToLocker();
				expect(largeLockers.length).to.equal(2);
				resetLockers();
			});

			it("Should throw error if attempting to add large bag to full large locker", function() {
				largeLockers = fullLocker;
				expect(function() {
					(new Locker("Casey", 21)).addToLocker();
				}).to.throw(Error);
				resetLockers();
			});

			it("Should add bags to first available locker", function() {
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				var locker2 = new Locker("Steve", 10);
				locker2.addToLocker();
				locker.checkOut();
				expect(smallLockers[1].owner).to.equal("Steve");
				resetLockers();
			});

			it("Should add small bags to medium locker if small lockers are full", function() {
				smallLockers = fullLocker;
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				expect(mediumLockers.length).to.equal(1);
				resetLockers();
			});

			it("Should add small bags to large locker if small & medium lockers are full", function() {
				smallLockers = fullLocker;
				mediumLockers = fullLocker;
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				expect(largeLockers.length).to.equal(1);
				resetLockers();
			});

			it("Should throw error if attempting to add small bag and ALL lockers are full", function() {
				smallLockers = fullLocker;
				mediumLockers = fullLocker;
				largeLockers = fullLocker;
				expect(function() {
					(new Locker("Casey", 10)).addToLocker();
				}).to.throw(Error);
				resetLockers();
			});

			it("Should add medium bags to large locker if medium lockers are full", function() {
				mediumLockers = fullLocker;
				var locker = new Locker("Casey", 11);
				locker.addToLocker();
				expect(largeLockers.length).to.equal(1);
				resetLockers();
			});

			it("Should throw error if attempting to add medium bag and medium/large lockers are full", function() {
				mediumLockers = fullLocker;
				largeLockers = fullLocker;
				expect(function() {
					(new Locker("Casey", 11)).addToLocker();
				}).to.throw(Error);
				resetLockers();
			});
		});

		describe("Giving customer ticket", function() {
			it("Given a small bag (and space is available in small lockers) ticket should display small", function() {
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				expect(currentTicket[0]).to.equal("small");
				resetLockers();
			});

			it("Given a small bag (and space is NOT available in small lockers) ticket should display medium", function() {
				smallLockers = fullLocker;
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				expect(currentTicket[0]).to.equal("medium");
				resetLockers();
			});

			it("Given a small bag (and space is NOT available in small OR medium lockers) ticket should display large", function() {
				smallLockers = fullLocker;
				mediumLockers = fullLocker;
				var locker = new Locker("Casey", 10);
				locker.addToLocker();
				expect(currentTicket[0]).to.equal("large");
				resetLockers();
			});

			it("Given a medium bag (and space is available in medium lockers) ticket should display medium", function() {
				var locker = new Locker("Casey", 11);
				locker.addToLocker();
				expect(currentTicket[0]).to.equal("medium");
				resetLockers();
			});

			it("Given a medium bag (and space is NOT available in medium lockers) ticket should display large", function() {
				mediumLockers = fullLocker;
				var locker = new Locker("Casey", 11);
				locker.addToLocker();
				expect(currentTicket[0]).to.equal("large");
				resetLockers();
			});

			it("Given a large bag (and space is available in large lockers) ticket should display large", function() {
				var locker = new Locker("Casey", 21);
				locker.addToLocker();
				expect(currentTicket[0]).to.equal("large");
				resetLockers();
			});

		});
	});
});