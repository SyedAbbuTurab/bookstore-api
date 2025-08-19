const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });

//function advancedWebsocketHandler(messages) {
  // your code here
//   const result = [];

//   for (const msg of messages) {
//     // const { type, payload } = msg;
//     const parsedMsg = typeof msg === 'string' ? JSON.parse(msg) : msg;
//     const { type } = parsedMsg;

//     const payload = typeof parsedMsg.payload === 'string' ? JSON.parse(parsedMsg.payload) : parsedMsg.payload;
//     // let payload = parsedMsg.payload;
//     // if(typeof payload === 'string') {
//     //   payload = JSON.parse(payload);
//     // }
//     if (type === 'create') {
//       const { itemName, quantity } = payload;
//       result.push(`Created ${quantity} of ${itemName}`);
//     }
//     else if (type === 'modify') {
//     const { itemId, action, amount } = payload;
//     const actionPast = action === 'add' ? 'added' : 'subtracted' 
//       result.push(`Item ${itemId} quantity ${actionPast} by ${amount}`);
//     }
//     else if (type === 'query') {
//     const { queryType, queryValue } = payload;
//       result.push(`Query of type ${queryType} with value ${queryValue} processed`);
//     }
//   }

//   console.log(result);
//   return result;
// }