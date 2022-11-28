import { COMMENTS } from "../../testData/COMMENTS";

export const selectCommentsByFarmstandId = (id) => {
  return COMMENTS.filter((farmstand) => farmstand.id === parseInt(id));
}