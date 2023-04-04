import { Button, Grid, Stack, Typography, Card, CardContent, Divider, Box } from "@mui/material";
import { DateTime } from "luxon";

type scheduleProps = {
    schedule: Array<object>
}

const CustomCard = ({ item }) => {
    const fp1 = DateTime.fromISO(`${item["FirstPractice/Date"]}T${item["FirstPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const fp2 = DateTime.fromISO(`${item["SecondPractice/Date"]}T${item["SecondPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const fp3 = DateTime.fromISO(`${item["ThirdPractice/Date"]}T${item["ThirdPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const sprintRace = DateTime.fromISO(`${item["Sprint/Date"]}T${item["Sprint/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const qual = DateTime.fromISO(`${item["Qualifying/Date"]}T${item["Qualifying/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const race = DateTime.fromISO(`${item["Date"]}T${item["Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();

    return (
        <Box width="90%" marginTop={1} marginBottom={1}>
            <Card>
                <CardContent>
                    <Typography variant="h4">{item["RaceName"]}</Typography>
                    <Typography variant="h6">{item["Circuit/CircuitName"]}</Typography>
                </CardContent>

                {sprintRace !== 'Invalid DateTime' &&
                    <CardContent>
                        <Typography>FP1: {fp1}</Typography>
                        <Typography>Qual: {qual}</Typography>
                        <Divider></Divider>
                        <Typography>FP2: {fp2}</Typography>
                        <Typography>Sprint: {sprintRace}</Typography>
                        <Divider></Divider>
                        <Typography>Race: {race}</Typography>
                    </CardContent>
                }

                {sprintRace === 'Invalid DateTime' &&
                    <CardContent>
                        <Typography>FP1: {fp1}</Typography>
                        <Typography>FP2: {fp2}</Typography>
                        <Typography>FP3: {fp3}</Typography>
                        <Divider></Divider>
                        <Typography>Qual: {qual}</Typography>
                        <Divider></Divider>
                        <Typography>Race: {race}</Typography>
                    </CardContent>
                }
            </Card>
        </Box>
    )
};

export default function Schedule(props: scheduleProps) {
    const { schedule } = props;

    return (
        <>
            <Grid container alignItems="center" justifyContent="center">
                {
                    schedule.map((item) => {
                        return (
                            <CustomCard item={item} key={item._round} />
                        )
                    })
                }
            </Grid>
        </>
    )
}
