import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import { setList } from "./redux/midarea/listSlice"; // Import the correct action

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const area_list = useSelector((state) => state.list);
 
  const onDragEnd = (result) => {
    if (!result.destination) return; // Check if the item was dropped outside
  
    const old_list = [...area_list.midAreaLists];
    const source_index = old_list.findIndex(
      (x) => x.id === result.source.droppableId
    );
  
    // Dragging from Sidebar
    if (result.source.droppableId.startsWith("sideArea")) {
      const newComponent = result.draggableId.split("-")[0]; // Get the component name
      const dest_index = old_list.findIndex(
        (x) => x.id === result.destination.droppableId
      );
  
      if (dest_index > -1) {
        const dest_list = [...old_list[dest_index].comps];
        dest_list.splice(result.destination.index, 0, newComponent); // Add new component to the destination list
        dispatch(setList({ id: old_list[dest_index].id, list: dest_list }));
      }
      return; // Exit after handling the addition
    }
  
    // Dragging within MidArea
    if (source_index > -1) {
      const source_list = [...old_list[source_index].comps];
      const [movedItem] = source_list.splice(result.source.index, 1);
      dispatch(setList({ id: old_list[source_index].id, list: source_list }));
  
      const dest_index = old_list.findIndex(
        (x) => x.id === result.destination.droppableId
      );
  
      if (dest_index > -1) {
        const dest_list = [...old_list[dest_index].comps];
        dest_list.splice(result.destination.index, 0, movedItem);
        dispatch(setList({ id: old_list[dest_index].id, list: dest_list }));
      }
    }
  };
  
  
  return (
    <div className="bg-blue-100 font-sans">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              MIT Scratch
            </Typography>
            <Button color="inherit">
              <GitHubIcon
                onClick={() =>
                  (window.location.href =
                    "https://github.com/peeyush14goyal/MIT-Scratch-Clone")
                }
              />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="h-screen overflow-hidden flex flex-row pt-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar />
            <MidArea />
          </div>
          <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
