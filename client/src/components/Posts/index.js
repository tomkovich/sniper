import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { FETCH_POSTS } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 40,
    display: "grid",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gridTemplateColumns: "repeat(auto-fill, 350px)",
    gridTemplateRows: "1fr",
    gridGap: 40,
    justifyItems: "center",
  },
  card: {
    width: 350,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 2,
  },
  header: {
    height: 92,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Posts = ({ fetchPosts, posts }) => {
  const classes = useStyles();
  useEffect(() => fetchPosts(), [fetchPosts]);

  return (
    <div className={classes.container}>
      {posts.length &&
        posts.map((post) => {
          const { photo, title, date, description, _user, _id } = post;

          const postDate = new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const postImage = `${window.location.origin}/images/users/${photo}`;

          return (
            <Card className={classes.card} key={_id}>
              <CardHeader
                className={classes.header}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    user
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={title}
                subheader={postDate}
              />
              <CardMedia
                className={classes.media}
                image={postImage}
                title={title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton aria-label="show more">
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch({ type: FETCH_POSTS }),
  };
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
