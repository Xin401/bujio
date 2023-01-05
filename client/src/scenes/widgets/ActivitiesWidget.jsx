import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "state";
import ActivityWidget from "./ActivityWidget";

const ActivitiesWidget = ({ userId, isProfile = false, profileId = null }) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const token = useSelector((state) => state.token);
  const filter = useSelector((state) => state.filter);
  const [editOpen, setEditOpen] = useState();

  const getActivities = async () => {
    console.log("getting activities");
    const response = await fetch(`http://localhost:3001/activities/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    dispatch(setActivities({ activities: data }));
  };

  const getUserActivities = async () => {
    console.log("getting user activities");
    const response = await fetch(
      `http://localhost:3001/activities/${profileId}/activities/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(setActivities({ activities: data }));
  };

  useEffect(() => {
    console.log(activities)
    if (isProfile) {
      getUserActivities();
    } else {
      getActivities();
    }
  }, [filter, editOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {activities ? activities.map(
        ({
          _id,
          host,
          name,
          description,
          participants,
          department,
          picturePath,
          userPicturePath,
          join,
          comments,
          tags,
          date,
          friendOnly,
          heading,
          limit,
        }) => (
          <ActivityWidget
            key={_id}
            activityId={_id}
            activityUserId={host}
            name={name}
            description={description}
            participants={participants}
            department={department}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            join={join}
            comments={comments}
            tags={tags}
            date={date}
            friendOnly={friendOnly}
            heading={heading}
            limit={limit}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
          />
        )
      ) : <></>}
    </>
  );
};

export default ActivitiesWidget;
