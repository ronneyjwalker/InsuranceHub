class Quotation {
  // getLifeQuote(values) {
  //   let packages = {
  //     Platinum: "",
  //     Gold: "",
  //     Silver: "",
  //   };

  //   var weight = values.weight;
  //   var dependent = values.dependent;
  //   var smoking = values.smoking;
  //   let price = 120;
  //   var bloodgroup = values.bloodGroup;

  //   if (weight < 35) {
  //     price = 130;
  //   } else if (weight < 95) {
  //     price = 145;
  //   } else if (weight < 195) {
  //     price = 155;
  //   } else {
  //     price = 175;
  //   }

  //   if (dependent === 1) {
  //     price += 15;
  //   } else if (dependent === 2) {
  //     price += 15;
  //   } else if (dependent === 3) {
  //     price += 15;
  //   } else if (dependent === 4) {
  //     price += 15;
  //   } else if (dependent === 5) {
  //     price += 15;
  //   }

  //   if (smoking) {
  //     price += 60;
  //   }

  //   if (smoking || bloodgroup === "O-" || bloodgroup === "B-") {
  //     packages.Platinum = price * (1 - (2 * dependent) / 100);
  //   }

  //   if (dependent !== 0) {
  //     packages.Silver = price * 0.8;
  //   }

  //   if (weight < 60) {
  //     packages.Gold = price * 0.96;
  //   } else if (weight < 120) {
  //     packages.Gold = price * 0.92;
  //   } else if (weight < 220 || bloodgroup === "AB-") {
  //     packages.Gold = price * 2.88;
  //   } else {
  //     packages.Gold = price * 0.84;
  //   }

  //   return packages;
  // }
  getLifeQuote(formData) {

    const bloodGroup = formData.bloodGroup;
    const dependent = formData.dependent;
    const employment = formData.employment;
    const height = formData.height;
    const smoking = formData.smoking;
    const weight = formData.weight;


    let platinumPrice = 500;
    let goldPrice = 300;
    let silverPrice = 100;

    // Example pricing logic (adjust as per actual business rules)
    // These are just arbitrary rules for demonstration purposes
    // if (bloodGroup === 'AB-') {
    //   platinumPrice += 500;
    //   goldPrice += 300;
    //   silverPrice += 100;
    // }

    if (dependent >= 2) {
      platinumPrice += 200;
      goldPrice += 100;
    }

    if (employment === 'fullTime') {
      platinumPrice += 150;
      goldPrice += 80;
      silverPrice += 30;
    }

    if (height > 160 && height < 180) {
      platinumPrice += 100;
      goldPrice += 50;
    }

    if (smoking || bloodGroup === "O-" || bloodGroup === "B-") {
      platinumPrice += 300;
      goldPrice += 150;
      silverPrice += 50;
    } else {
      platinumPrice += 100;
      goldPrice += 50;
      silverPrice += 25;
    }

    if (weight < 220) {
      platinumPrice += 200;
      goldPrice += 100;
    } else {
      platinumPrice += 50;
      goldPrice += 25;
    }


    const packages = {
      Platinum: `$${platinumPrice}`,
      Gold: `$${goldPrice}`,
      Silver: `$${silverPrice}`,
    };

    return packages;
  }

  getHomeQuote(formData) {

    const propertyValue = formData.propertyValue;
    const numBathrooms = formData.numBathrooms;
    const numBedrooms = formData.numBedrooms;
    const propertyLocation = formData.propertyLocation;
    const propertySquareFeet = formData.propertySquareFeet;
    const policyTenure = formData.policyTenure

    let platinumPrice = 0;
    let goldPrice = 0;
    let silverPrice = 0;


    platinumPrice += numBathrooms * 50;
    goldPrice += numBedrooms * 100;

    if (propertyValue > 500000) {
      platinumPrice += 200;
      goldPrice += 100;
      silverPrice += 50;
    } else {
      platinumPrice += 100;
      goldPrice += 50;
      silverPrice += 25;
    }

    if (propertyLocation === 'downtown') {
      platinumPrice += 300;
      goldPrice += 150;
      silverPrice += 75;
    } else {
      platinumPrice += 150;
      goldPrice += 100;
      silverPrice += 50;
    }

    platinumPrice += propertySquareFeet * 0.1;
    goldPrice += propertySquareFeet * 0.05;

    if (policyTenure >= 5) {
      platinumPrice -= 100;
      goldPrice -= 50;
      silverPrice -= 25;
    } else {
      platinumPrice += 100;
      goldPrice += 50;
      silverPrice += 25;
    }


    const packages = {
      Platinum: `$${platinumPrice}`,
      Gold: `$${goldPrice}`,
      Silver: `$${silverPrice}`,
    };

    return packages;
  }

  getCarQuote(formData) {

    const automobileUsage = formData.automobileUsage;
    const automobileModel = formData.automobileModel;
    const automobileYear = formData.automobileYear;
    const numDoors = formData.numDoors;
    let platinumPrice = 0;
    let goldPrice = 0;
    let silverPrice = 0;


    if (automobileUsage === 'personal') {
      platinumPrice += 200;
      goldPrice += 100;
    } else if (automobileUsage === 'business') {
      platinumPrice += 400;
      goldPrice += 200;
      silverPrice += 100;
    }

    if (automobileModel === 'luxury') {
      platinumPrice += 300;
      goldPrice += 150;
      silverPrice += 75;
    }

    if (automobileYear < 2010) {
      platinumPrice += 100;
      goldPrice += 50;
    }


    if (numDoors) {
      platinumPrice += numDoors * 50;
      goldPrice += numDoors * 25;
      silverPrice += numDoors * 15;
    }

    // // If the vehicle is a motorcycle
    // if (motorcycleType) {
    //   platinumPrice += 100;
    //   goldPrice += 50;
    // }


    const carpackages = {
      Platinum: `$${platinumPrice}`,
      Gold: `$${goldPrice}`,
      Silver: `$${silverPrice}`,
    };

    return carpackages;
  }

  getMotorcycleQuote(formData) {

    const automobileUsage = formData.automobileUsage;
    const automobileModel = formData.automobileModel;
    const automobileYear = formData.automobileYear;
    const motorcycleType = formData.motorcycleType;

    let platinumPrice = 0;
    let goldPrice = 0;
    let silverPrice = 0;


    if (automobileUsage === 'personal') {
      platinumPrice += 200;
      goldPrice += 100;
    } else if (automobileUsage === 'business') {
      platinumPrice += 400;
      goldPrice += 200;
      silverPrice += 100;
    }

    if (automobileModel === 'luxury') {
      platinumPrice += 300;
      goldPrice += 150;
      silverPrice += 75;
    } else {
      platinumPrice += 150;
      goldPrice += 75;
      silverPrice += 35;
    }

    if (automobileYear < 2010) {
      platinumPrice += 100;
      goldPrice += 50;
      silverPrice += 35;
    }

    // // If the vehicle is a car
    // if (numDoors) {
    //   platinumPrice += numDoors * 50;
    //   goldPrice += numDoors * 25;
    //   silverPrice += numDoors * 15;
    // }


    if (motorcycleType === "sport") {
      platinumPrice += 100;
      goldPrice += 50;
      silverPrice += 35;
    } else {
      platinumPrice += 75;
      goldPrice += 40;
      silverPrice += 25;
    }


    const motorcyclepackages = {
      Platinum: `$${platinumPrice}`,
      Gold: `$${goldPrice}`,
      Silver: `$${silverPrice}`,
    };

    return motorcyclepackages;
  }

}



export default new Quotation();
