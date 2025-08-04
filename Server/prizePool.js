let prizeMoney = 0;

const getPrizeMoney = () => {
    console.log("Current prize money:", prizeMoney);
    return prizeMoney;
};

const addToPrizeMoney = (amount) => { 
    prizeMoney += amount;
    console.log("Prize money updated to:", prizeMoney);
};

const resetPrizeMoney = () => { 
    prizeMoney = 0;
    console.log("Prize money reset to 0");
};

module.exports = {
    getPrizeMoney,
    addToPrizeMoney,
    resetPrizeMoney
};