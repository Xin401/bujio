import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  PersonAddDisabledOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setInvitations, setInvitings } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  small = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => {
    // console.log(state);
    return state.user;
  });
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const invitings = useSelector((state) => state.user.invitings);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isInvitings = invitings.find((friend) => friend._id === friendId);

  const handleFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data.friends }));
    dispatch(setInvitings({ invitings: data.invitings }));
    dispatch(setInvitations({ invitations: data.invitations }));
  };

  return small ? (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="35px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h6"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.5rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {_id !== friendId && (
        <IconButton
          size="small"
          onClick={() => handleFriends()}
          sx={{
            backgroundColor: primaryLight,
            p: "0.5rem",
            ml: "0.3rem",
            mr: "0rem",
          }}
        >
          {isFriend ? (
            <Tooltip title="remove">
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            </Tooltip>
          ) : isInvitings ? (
            <Tooltip title="cancel">
              <PersonAddDisabledOutlined sx={{ color: primaryDark }} />
            </Tooltip>
          ) : (
            <Tooltip title="add">
              <PersonAddOutlined sx={{ color: primaryDark }} />
            </Tooltip>
          )}
        </IconButton>
      )}
    </FlexBetween>
  ) : (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="50px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {_id !== friendId && (
        <IconButton
          onClick={() => handleFriends()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <Tooltip title="remove">
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            </Tooltip>
          ) : isInvitings ? (
            <Tooltip title="cancel">
              <PersonAddDisabledOutlined sx={{ color: primaryDark }} />
            </Tooltip>
          ) : (
            <Tooltip title="add">
              <PersonAddOutlined sx={{ color: primaryDark }} />
            </Tooltip>
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
