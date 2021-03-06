import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  initialState,
  selectChoices,
  selectAnswerChoice,
  selectSelectedAnswerChoice,
  selectScore,
} from "../quizSlice";
import { useAudio } from "../../../hooks/useAudio";
import { AppDispatch } from "../../../app/store";
import styles from "./QuizResult.module.css";
import { QuizDisplay } from "./QuizDisplay";

export const QuizResult = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch: AppDispatch = useDispatch();
  const resultChoices = useSelector(selectChoices);
  const columns = resultChoices[0] && Object.keys(resultChoices[0]);
  const { playAudio } = useAudio();
  const score = useSelector(selectScore);
  const selectedChoice = useSelector(selectSelectedAnswerChoice);
  const navigate = useNavigate();

  //列名の文字列変換用配列
  const dictionaryColumnArray = [
    {
      source: "quiz_question_text",
      replacement: "設問",
    },
    {
      source: "choice_text",
      replacement: "正答",
    },
    {
      source: "is_correct",
      replacement: "結果",
    },
  ];

  //行の文字列変換用配列
  const dictionaryRowArray = [
    {
      source: "false",
      replacement: "不正解",
    },
    {
      source: "true",
      replacement: "正解",
    },
  ];

  //初回読み込み時に自動でmodal表示 + 音声再生
  useEffect(() => {
    dispatch(selectAnswerChoice(initialState.selectedAnswerChoice));
    if (resultChoices[0].quiz !== "" && document.readyState === "complete") {
      const targetIcon = document.querySelector<HTMLElement>(".open-modal");
      targetIcon?.click();
    }
    playAudio("../../../../assets/audio/bamenntennkann-2.mp3", 0.1);
    if (score === 5) {
      setTimeout(() => {
        playAudio("../../../../assets/audio/clapping_short2.mp3", 0.1);
      }, 2000);
    }
  }, [resultChoices]);

  return (
    <>
      <Button onClick={handleOpen} className="open-modal">
        Open QuizResult Modal
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150vh",
            height: "90vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            overflowWrap: "break-word",
            p: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                fontWeight="bold"
                component="h1"
                sx={{ display: "inline-flex", mt: 2, ml: 3 }}
              >
                今 回 の 成 績
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h2"
                fontWeight="bold"
                component="h1"
                color={score === 5 ? "#ba2636" : "#3f312b"}
                sx={{ display: "inline-flex", mt: 2, ml: 5 }}
              >
                {score === 5 ? `満 点` : `${score} 点`}
              </Typography>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  navigate("/quizzes/");
                  // store内のRedux stateをリセット
                  window.location.reload();
                }}
                sx={{ ml: 7 }}
              >
                戻る
              </Button>
              {/* <Grid container spacing={2}>
              <Grid item xs={7}> */}
              <Table size="medium" className={styles.table} sx={{ mt: 6 }}>
                <TableHead>
                  <TableRow>
                    {columns.map(
                      (column, colIndex) =>
                        (column === "quiz_question_text" ||
                          column === "choice_text" ||
                          column === "is_correct") && (
                          <TableCell align="center" key={colIndex}>
                            <strong>
                              {dictionaryColumnArray
                                ? dictionaryColumnArray.find((pair) => {
                                    return pair.source === column;
                                  })!.replacement
                                : ""}
                            </strong>
                          </TableCell>
                        )
                    )}
                    <TableCell align="center">
                      <strong>詳細</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultChoices.map((row, rowIndex) => (
                    <TableRow hover key={rowIndex}>
                      {Object.keys(row).map(
                        (key, colIndex) =>
                          (key === "quiz_question_text" ||
                            key === "choice_text" ||
                            key === "is_correct") &&
                          row["is_correct"] !== undefined && (
                            <TableCell
                              align="center"
                              className={styles.tasklist__hover}
                              key={`${rowIndex}+${colIndex}`}
                              onClick={() => {
                                dispatch(selectAnswerChoice(row));
                              }}
                            >
                              <span
                                className={
                                  row[key]?.toString() === "true"
                                    ? styles.correct_char
                                    : row[key]?.toString() === "false"
                                    ? styles.incorrect_char
                                    : ""
                                }
                              >
                                {row[key]?.toString() === "true" ||
                                row[key]?.toString() === "false"
                                  ? dictionaryRowArray.find((pair) => {
                                      return (
                                        pair.source === row[key]?.toString()
                                      );
                                    })!.replacement
                                  : row[key]?.toString()}
                              </span>
                            </TableCell>
                          )
                      )}
                      {row["is_correct"] !== undefined ? (
                        <TableCell align="center">
                          <button
                            className={styles.tasklist__icon}
                            onClick={() => {
                              {
                                dispatch(selectAnswerChoice(row));
                              }
                            }}
                          >
                            <ContentPasteSearchRoundedIcon />
                          </button>
                        </TableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            {/* </Grid> */}
            <Grid item xs={4} mt={2.3} ml={3}>
              <QuizDisplay />
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Box>
      </Modal>
    </>
  );
};
