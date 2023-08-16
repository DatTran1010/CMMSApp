import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
} from "react-native";
import React, { useState } from "react";
import colors from "../Common/colors";
import TreeNode from "./TreeNode";
import { heightTextInput } from "../Common/dimentions";
const TreeList = () => {
  const data = [
    {
      id_NM: 1,
      TEN_NM: "Nhà máy 1",
      dataXuong: [
        {
          id_XUONG: 1,
          TEN_XUONG: "Xưởng  1",
          dataMay: [
            {
              id_MAY: 1,
              TEN_MAY: "Máy 1",
              dataDongCo: [
                { id_DC: 1, TEN_DC: "Động cơ 1" },
                { id_DC: 2, TEN_DC: "Động cơ 2" },
              ],
            },
            {
              id_MAY: 2,
              TEN_MAY: "Máy 2",
              dataDongCo: [
                { id_DC: 3, TEN_DC: "Động cơ 3" },
                { id_DC: 4, TEN_DC: "Động cơ 4" },
              ],
            },
          ],
        },
      ],
    },
  ];

  const [expandedLevels, setExpandedLevels] = useState([]);
  const toggleExpand = (levelIndex) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (expandedLevels.includes(levelIndex)) {
      setExpandedLevels(expandedLevels.filter((index) => index !== levelIndex));
    } else {
      setExpandedLevels([...expandedLevels, levelIndex]);
    }
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data}
        keyExtractor={(item, index) => index + ""}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={[0]}
        renderItem={({ item, index, event }) => {
          return (
            <View style={styles.treeListContainer}>
              <View>
                <Text>{item.TEN_NM}</Text>
                <View style={{ marginLeft: 10 }}>
                  {item.dataXuong.map((dataXuong) => (
                    <View key={dataXuong.id_XUONG}>
                      <Text>{dataXuong.TEN_XUONG}</Text>
                      <View style={{ marginLeft: 10 }}>
                        {dataXuong.dataMay.map((datamay) => (
                          <View key={datamay.id_MAY}>
                            <Text>{datamay.TEN_MAY}</Text>
                            <View style={{ marginLeft: 10 }}>
                              {datamay.dataDongCo.map((dataDC) => (
                                <View key={dataDC.id_DC}>
                                  <Text>{dataDC.TEN_DC}</Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      /> */}
      <Animated.FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1, marginBottom: 10 }}>
            {/* <TreeNode data={[item]} /> */}
            <View style={styles.levelTree}>
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={styles.labelTree}
              >
                <Text>{item.TEN_NM}</Text>
              </TouchableOpacity>
              {expandedLevels.includes(index) && (
                <View style={styles.levelTree}>
                  {item.dataXuong.map((dataXuong, indexXuong) => (
                    <View style={styles.contentTree} key={dataXuong.id_XUONG}>
                      <TouchableOpacity
                        onPress={() => {}}
                        style={styles.labelTree}
                      >
                        <Text>{dataXuong.TEN_XUONG}</Text>
                      </TouchableOpacity>
                      {expandedLevels.includes(index) && (
                        <View style={styles.levelTree}>
                          {dataXuong.dataMay.map((dataMay) => (
                            <View
                              style={styles.contentTree}
                              key={dataMay.id_MAY}
                            >
                              <TouchableOpacity style={[styles.labelTree]}>
                                <Text>{dataMay.TEN_MAY}</Text>
                              </TouchableOpacity>
                              <View style={styles.levelTree}>
                                {dataMay.dataDongCo.map((dataDC) => (
                                  <View
                                    style={styles.contentTree}
                                    key={dataDC.id_DC}
                                  >
                                    <TouchableOpacity style={styles.labelTree}>
                                      <Text>{dataDC.TEN_DC}</Text>
                                    </TouchableOpacity>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TreeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  treeListContainer: {
    flex: 1,
  },
  levelTree: {
    marginLeft: 10,
    marginVertical: 10,
    marginTop: 10,
    flex: 1,
  },
  contentTree: {
    marginVertical: 5,
  },
  labelTree: {
    backgroundColor: colors.primary,
    flex: 1,
    height: heightTextInput,
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});

// <View style={[styles.levelTree]}>
//   {dataXuong.dataMay.map((dataMay) => (
//     <View key={dataMay.id_MAY}>
//       <Text>{dataMay.TEN_MAY}</Text>
//       <View style={styles.levelTree}>
//         {dataMay.dataDongCo.map((dataDC) => (
//           <View key={dataDC.id_DC}>
//             <Text>{dataDC.TEN_DC}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   ))}
// </View>;
