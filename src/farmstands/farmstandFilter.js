import { FARMSTANDS } from "../testData/FARMSTANDS";

export const selectAllFarmstands = () => {
  return FARMSTANDS;
};

// find one
export const selectFeaturedFarmstand = () => {
  return FARMSTANDS.find((farmstand) => farmstand.featured);
};

// find all featured
export const selectFeaturedFarmstands = () => {
  return FARMSTANDS.filter((farmstand) => farmstand.featured);
};

export const selectRandomFarmstand = () => {
  return FARMSTANDS[Math.floor(FARMSTANDS.length * Math.random())];
}

export const selectFarmstandById = (id) => {
  return FARMSTANDS.find((farmstand) => farmstand.id === parseInt(id));
};