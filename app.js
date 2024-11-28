import express from "express";
const items = [
  { id: 1, label: "item 1", position: 1 },
  { id: 2, label: "item 2", position: 2 },
  { id: 3, label: "item 3", position: 3 },
  { id: 4, label: "item 4", position: 4 },
  { id: 5, label: "item 5", position: 5 },
  { id: 6, label: "item 6", position: 6 },
];

// the problem in the old code is that it only works in the first time since the position is sync with the index, but then it doesnt work anymore
// the idea is to take the old position and the new position of the dragged item as arguments, find the items using the method find instead of indexes since positionn and index are not necessarily the synchronized, we will then update the position of the items positionned between the old and new position (included), finallly change the position of the dragged item to its new positionn, that way we won't need to sort the list, also i figured out that i dont need the if statement since the same instructions are given, i will just make a start and end pos and eliminate redundant code

function changePosision(oldPos, newPos) {
  const oldItem = items.find((item) => item.position == oldPos);
  const incrementDecrement = oldPos < newPos ? -1 : 1;
  const [start, end] =
    oldPos < newPos ? [oldPos + 1, newPos] : [newPos, oldPos - 1];
  for (let item of items) {
    if (item.position >= start && item.position <= end) {
      item.position += incrementDecrement;
    }
  }
  oldItem.position = newPos;
  return items;
}

// console.log(changePosision(2, 5));
// console.log(changePosision(3, 6));

const app = express();
app.use(express.json());

app.post("/reorder", (req, res) => {
  const newItemList = changePosision(req.body.oldPos, req.body.newPos);
  res.json(newItemList);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => "app listening on port 3000");

const email = "lamghari.majid@bcg.com";
