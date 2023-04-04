// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

error BuyMeCoffee__NotEnoughETH();
error BuyMeCoffee__NotOwner();
error BuyMeCoffee__NoFundsToWithdraw();
error BuyMeCoffee__TransferFailed();

contract BuyMeCoffee {
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        uint256 tip;
    }

    address payable public owner;
    mapping(address => Memo) public memos;

    modifier onlyOwner() {
        if (!(msg.sender == owner)) {
            revert BuyMeCoffee__NotOwner();
        }
        _;
    }

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message,
        uint256 tip
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        if (!(msg.value > 0)) {
            revert BuyMeCoffee__NotEnoughETH();
        }

        memos[msg.sender] = Memo(_name, _message, block.timestamp, msg.value);
        emit NewMemo(msg.sender, block.timestamp, _name, _message, msg.value);
    }

    function withdraw() public onlyOwner {
        if (!(address(this).balance > 0)) {
            revert BuyMeCoffee__NoFundsToWithdraw();
        }

        (bool success, ) = owner.call{value: address(this).balance}("");
        if (!success) {
            revert BuyMeCoffee__TransferFailed();
        }
    }

    function getMemo(address _address) public view returns (Memo memory) {
        return memos[_address];
    }
}
