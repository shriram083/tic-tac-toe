import "./App.css";
import { Box, Button, Grid, Heading, Toast, useToast } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const toast = useToast();
  const [data, setData] = useState(new Array(9).fill(""));
  const [user, setUser] = useState(true);
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleClick = async (index) => {
    if (!clicked) {
      if (data[index] === "") {
        setCount((prev) => prev + 1);
        if (user) {
          data[index] = "X";
        } else {
          data[index] = "O";
        }
        setUser(!user);
      }

      if (checkIsWin() == true) {
        setClicked(true);
        let winner;
        if (user) {
          winner = "Player X is Winner";
        } else {
          winner = "Player O is Winner";
        }
        toast({
          title: "Congratulations !!!",
          description: winner,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          setData(new Array(9).fill(""));
          setUser(true);
          setClicked(false);
          return setCount(0);
        }, 2000);
      }
      if (count >= 8) {
        toast({
          title: "Oops...It's Tie !!!",
          description: "Match Widrawed",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          setData(new Array(9).fill(""));
          setUser(true);
          setClicked(false);
          return setCount(0);
        }, 2000);
      }
    }
  };
  const checkIsWin = () => {
    // console.log("called");
    return (
      (data[0] === data[1] && data[0] === data[2] && data[0] !== "") ||
      (data[3] === data[4] && data[3] === data[5] && data[3] !== "") ||
      (data[6] === data[7] && data[6] === data[8] && data[6] !== "") ||
      (data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
      (data[2] === data[4] && data[2] === data[6] && data[2] !== "") ||
      (data[0] === data[3] && data[0] === data[6] && data[0] !== "") ||
      (data[1] === data[4] && data[1] === data[7] && data[1] !== "") ||
      (data[2] === data[5] && data[2] === data[8] && data[2] !== "")
    );
  };

  return (
    <div className="App">
      <Heading marginBottom={"50px"} color={"red"}>
        Welcome To Tic-Tac-Toe Game !
      </Heading>
      <Grid
        gap={"10px"}
        templateRows={"repeat(3, 1fr)"}
        templateColumns={"repeat(3, 1fr)"}
        width={"360px"}
        height={"360px"}
      >
        {data.map((el, i) => {
          return (
            <Button
              color={el === "X" ? "red" : "blue"}
              fontSize={"30px"}
              fontWeight={"500"}
              key={i}
              height={"120px"}
              onClick={() => handleClick(i)}
              transitionDuration={"0.3s"}
              _hover={{ backgroundColor: "#e2d2c0" }}
            >
              {el}
            </Button>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
