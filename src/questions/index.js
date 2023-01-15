import selectAll from "./selectAll";
import selectSpecific from "./selectSpecific";
import selectUnique from "./selectUnique";
import basicWhere from "./basicWhere";
import whereIn from "./whereIn";
import whereConjunction from "./whereConjunction";
import orderBy from "./orderBy";
import orderByMultiple from "./orderByMultiple";
import selectNull from "./selectNull";
import limitAndOrder from "./limitAndOrder";
import like from "./like";
import between from "./between";
import minMaxAvg from "./minMaxAvg";
import count from "./count";
import columnAlias from "./alias";
import top from "./top";
import deleteTable from "./deleteTable";
import createIndex from "./createIndex";
import fetchNext from "./fetchNext";



// eslint-disable-next-line import/no-anonymous-default-export
export default [
  selectAll,
  selectSpecific,
  selectUnique,
  basicWhere,
  whereIn,
  whereConjunction,
  orderBy,
  orderByMultiple,
  selectNull,
  limitAndOrder,
  minMaxAvg,
  count,
  columnAlias,
  between,
  like,
  top,
  deleteTable,
  createIndex,
  fetchNext
];
