import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyActivityWidget from "scenes/widgets/MyActivityWidget";
import ActivitiesWidget from "scenes/widgets/ActivitiesWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        sx={{ mt: "30px" }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Box m="2rem 0" />
          <UserWidget
            profileId={userId}
            picturePath={user.picturePath}
            userId={_id}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "0rem"}
        >
          {/* <MyActivityWidget picturePath={user.picturePath} /> */}

          <ActivitiesWidget profileId={userId} isProfile userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
