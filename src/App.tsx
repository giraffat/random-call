import React, {useState} from "react";
import "./App.css";
import {Button, Container, FormControlLabel, GlobalStyles, Stack, Switch, Typography} from "@mui/material";
import students from "./students.json";
import {useRollingStudents} from "./ShuffledStudents";

function App() {
    const fullSizeStyle = {width: "100", height: "100%"};
    const [isRolling, setRolling] = useState(false);
    const student = useRollingStudents(students, isRolling);

    const [isWhiteboardMode, setWhiteboardMode] = useState(false);

    const containerStyle = {
        "padding": "32px !important",
        "display": "flex",
        "justifyContent": isWhiteboardMode ? "end" : "center",
        "alignItems": isWhiteboardMode ? "flex-end" : "stretch",
        "flexDirection": "Column",
    };

    return (
        <Container
            maxWidth={isWhiteboardMode ? false : "sm"}
            sx={[
                fullSizeStyle,
                containerStyle
            ]}>
            <Stack minWidth={200}>
                <Stack>
                    <Typography component="p" variant="subtitle1">今天的幸运儿是：</Typography>
                    <Typography component="p" variant="h4">
                        {student === undefined ? "???" : `[${(student.number + 1).toString().padStart(students.length.toString().length, "0")}] ${student.name}`}
                    </Typography>
                </Stack>
                <Button variant="outlined" fullWidth={true}
                        onClick={() => setRolling(!isRolling)}
                        sx={{"marginTop": 4}}>
                    {isRolling ? "停止" : "启动"}
                </Button>
                <FormControlLabel label="白板模式"
                                  control={<Switch checked={isWhiteboardMode}
                                                   onChange={(event, checked) => setWhiteboardMode(checked)}/>}
                                  sx={{"marginTop": 2}}/>

                <GlobalStyles styles={{"body, html, #root": fullSizeStyle, "body": {"backgroundColor": "#eceff1"}}}/>
            </Stack>
        </Container>
    );
}

export default App;
