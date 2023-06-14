// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract Property2{
    enum Role{user,admin}
    enum Status{none,pending,approved,bought,rejected}

    struct PropertyDetails{
        Status status;
        uint256 valuation;
        address payable owner;
    }

    mapping(string=>PropertyDetails) public details;
    mapping(string=>address) public propertyOwner;
    mapping(address=>Role) public userRole;
    // mapping(address=>bool) public verify;

    modifier Owner(string memory _id){
        require(propertyOwner[_id]==msg.sender);
        _;
    }

    // modifier verifiedUser(address user){
    //     require(verify[user]);
    //     _;
    // } 

    modifier admin(address adr){
        require(userRole[adr]== Role.admin);
        _;
    }

    address public Admin;

    constructor() public{
        Admin = msg.sender;
        // verify[msg.sender] = true;
        userRole[msg.sender] = Role.admin;
    }

    function createProperty(string memory _id, uint256 value, 
    address payable owner) public {
        details[_id] = PropertyDetails(Status.pending,value,owner);
    }

    function approveProperty(string memory _id) public admin(msg.sender) returns(bool){
        require(details[_id].status == Status.pending);
        details[_id].status = Status.approved;
        return true;
    }

    function rejectProperty(string memory _id) public admin(msg.sender){
        details[_id].status = Status.rejected;
    }

    function getProperty(string memory _id) public payable {

        require(msg.value == details[_id].valuation);
        require(details[_id].status == Status.approved);

        details[_id].owner.transfer(msg.value);
        details[_id].status = Status.bought;
        details[_id].owner = payable(msg.sender);
        propertyOwner[_id] = msg.sender;
        

    }

    function changeValuation(string memory _id, uint256 value) public{
            require(details[_id].valuation != value );
            details[_id].valuation = value;
    }

    function getPropertyStatus(string memory _id) public view returns (Status) {
    return details[_id].status;
    }


    function getPropertyValuation(string memory _id) public view returns (uint256) {
    return details[_id].valuation;
    }

    function getPropertyOwner(string memory _id) public view returns (address){
        return details[_id].owner;
    }
}