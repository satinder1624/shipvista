import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "./actions/plant";

function Plant({ list, updatePlant }) {
  useEffect(() => {
    setPlants(list);
  }, [list]);
  const [plants, setPlants] = useState(list);

  const handleClick = (id) => {
    const newList = [...plants];
    if (newList[id - 1].waterStatus === "low" || newList[id - 1].condition) {
      newList[id - 1].watering = true;
      newList[id - 1].condition = false;
      updatePlant(id, newList[id - 1], () => {
        console.log("Updated");
      });
      setPlants(newList);

      setTimeout(() => {
        newList[id - 1].watering = false;
        newList[id - 1].waterStatus = "high";
        newList[id - 1].lastTimeWater = new Date();
        updatePlant(id, newList[id - 1], () => {
          console.log("Updated");
        });
        setPlants(newList);
      }, 10000);

      setTimeout(() => {
        newList[id - 1].condition = true;
        updatePlant(id, newList[id - 1], () => {
          console.log("Updated");
        });
        setPlants(newList);
      }, 40000);
    }
  };

  const SixHourAgo = (date) => {
    const hour = 1000 * 60 * 60;
    const sixHour = 6 * hour;
    return new Date() - Date.parse(date) < sixHour;
  };

  return (
    <div>
      <div className="plant">
        {plants.map((plant) => (
          <div key={plant.id} className="plantBox">
            {plant.watering ? (
              <div>
                <div className="loading-wrapper">
                  <div className="loading-pouring"></div>
                </div>
                <div className="loading-name">
                  <p>WATERING PLANT</p>
                </div>
              </div>
            ) : (
              <div className="singlePlant">
                <span>Plant No: {plant.id}</span>
                <span>
                  Water Status:
                  {SixHourAgo(plant.lastTimeWater)
                    ? (plant.waterStatus = "high")
                    : (plant.waterStatus = "low")}
                </span>

                {SixHourAgo(plant.lastTimeWater) ? (
                  <>
                    {plant.condition ? (
                      <button
                        onClick={() => handleClick(plant.id)}
                        className="water-btn"
                      >
                        Water
                      </button>
                    ) : (
                      <button className="wait-btn">Wait</button>
                    )}
                  </>
                ) : (
                  <button
                    className="alertBtn"
                    onClick={() => handleClick(plant.id)}
                  >
                    Alert Water
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    plantList: state.plant.list,
  };
};

const mapActionToProps = {
  updatePlant: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(Plant);
