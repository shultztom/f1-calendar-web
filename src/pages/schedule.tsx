import { Button, Grid, Stack, Typography, Card, CardContent, Divider, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Link from 'next/link';
import { useRouter } from 'next/router';

type scheduleType = {
    RaceName: string;
    "Circuit/CircuitName": string;
    "Circuit/Location/Locality": string;
    "Circuit/Location/Country": string;
    "Circuit/Location/_lat": string;
    "Circuit/Location/_long": string;
    "Circuit/_circuitId": string;
    "Circuit/_url": string;
    Date: Date;
    Time: string;
    "FirstPractice/Date": Date;
    "FirstPractice/Time": string;
    "SecondPractice/Date": Date;
    "SecondPractice/Time": string;
    "ThirdPractice/Date": Date;
    "ThirdPractice/Time": string;
    "Qualifying/Date": Date;
    "Qualifying/Time": string;
    _season: string;
    _round: string;
    _url: string;
    "Sprint/Date": string;
    "Sprint/Time": string;
}

type scheduleProps = {
    schedule: Array<scheduleType>
}

const CustomCard = ({ item }: { item: scheduleType }) => {
    const fp1 = DateTime.fromISO(`${item["FirstPractice/Date"]}T${item["FirstPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const fp2 = DateTime.fromISO(`${item["SecondPractice/Date"]}T${item["SecondPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const fp3 = DateTime.fromISO(`${item["ThirdPractice/Date"]}T${item["ThirdPractice/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const sprintRace = DateTime.fromISO(`${item["Sprint/Date"]}T${item["Sprint/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const qual = DateTime.fromISO(`${item["Qualifying/Date"]}T${item["Qualifying/Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();
    const race = DateTime.fromISO(`${item["Date"]}T${item["Time"]}`).toLocaleString(DateTime.DATETIME_SHORT).toString();

    return (

        <Box width="90%" marginTop={1} marginBottom={1}>
            <Card id={item._round}>
                <CardContent>
                    <Link href={`#${item._round}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="h4">{item["RaceName"]}</Typography>
                    </Link>
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
    const router = useRouter();

    const getClosestRaceWeekend = (sched: Array<scheduleType>) => {
        // Get diff
        // Get first one that isn't negative, that is this race weekend
        for (let item of sched) {
            const race = DateTime.fromISO(`${item["Date"]}T${item["Time"]}`);
            const diff = race.diffNow('minutes');
            const diffInMinutes = diff.minutes;
            if (diffInMinutes > 0) {
                return item;
            }
        }
    }

    useEffect(() => {
        const closestWeekend = getClosestRaceWeekend(schedule);
        router.push(`#${closestWeekend?._round}`).catch(err => console.error(err.message)); // TODO look into error here
        
    }, [schedule]);

    return (
        <>
            <Grid container alignItems="center" justifyContent="center">
                {
                    schedule && schedule.map((item) => {
                        return (
                            <CustomCard item={item} key={item._round} />
                        )
                    })
                }
            </Grid>
        </>
    )
}
