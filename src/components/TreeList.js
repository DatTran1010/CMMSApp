import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    LayoutAnimation,
    Animated,
} from "react-native";
import React, { useState, useMemo } from "react";
import colors from "../Common/colors";
import TreeNode from "./TreeNode";
import { heightTextInput } from "../Common/dimentions";
const TreeList = ({ data, handleCheckedLisItem }) => {
    return (
        <View style={styles.container}>
            <Animated.FlatList
                style={{ flex: 1 }}
                data={data}
                keyExtractor={(item, index) => index + ""}
                renderItem={({ item, index, key }) => (
                    <TreeNode
                        data={[item]}
                        onCheckedItem={handleCheckedLisItem}
                    />
                )}
            />
        </View>
    );
};

export default TreeList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 10,
        flex: 1,
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

// <View style={{ flex: 1, marginBottom: 10 }}>
// {/* <TreeNode data={[item]} /> */}
// <View style={styles.levelTree}>
//     <TouchableOpacity
//         onPress={() => toggleExpand(index)}
//         style={styles.labelTree}
//     >
//         <Text>{item.TEN_NM}</Text>
//     </TouchableOpacity>
//     {expandedLevels.includes(index) && (
//         <View style={styles.levelTree}>
//             {item.dataXuong.map(
//                 (dataXuong, indexXuong, key) => (
//                     <View
//                         style={styles.contentTree}
//                         key={dataXuong.id_XUONG}
//                     >
//                         <TouchableOpacity
//                             onPress={() =>
//                                 toggleExpand(indexXuong)
//                             }
//                             style={styles.labelTree}
//                         >
//                             <Text>
//                                 {dataXuong.TEN_XUONG}
//                             </Text>
//                         </TouchableOpacity>
//                         {expandedLevels.includes(
//                             indexXuong
//                         ) && (
//                             <View
//                                 style={styles.levelTree}
//                             >
//                                 {dataXuong.dataMay.map(
//                                     (
//                                         dataMay,
//                                         indexMay
//                                     ) => (
//                                         <View
//                                             style={
//                                                 styles.contentTree
//                                             }
//                                             key={
//                                                 dataMay.id_MAY
//                                             }
//                                         >
//                                             <TouchableOpacity
//                                                 style={[
//                                                     styles.labelTree,
//                                                 ]}
//                                                 onPress={() =>
//                                                     toggleExpand(
//                                                         indexMay
//                                                     )
//                                                 }
//                                             >
//                                                 <Text>
//                                                     {
//                                                         dataMay.TEN_MAY
//                                                     }
//                                                 </Text>
//                                             </TouchableOpacity>
//                                             {expandedLevels.includes(
//                                                 indexMay
//                                             ) && (
//                                                 <View
//                                                     style={
//                                                         styles.levelTree
//                                                     }
//                                                 >
//                                                     {dataMay.dataDongCo.map(
//                                                         (
//                                                             dataDC
//                                                         ) => (
//                                                             <View
//                                                                 style={
//                                                                     styles.contentTree
//                                                                 }
//                                                                 key={
//                                                                     dataDC.id_DC
//                                                                 }
//                                                             >
//                                                                 <TouchableOpacity
//                                                                     style={
//                                                                         styles.labelTree
//                                                                     }
//                                                                 >
//                                                                     <Text>
//                                                                         {
//                                                                             dataDC.TEN_DC
//                                                                         }
//                                                                     </Text>
//                                                                 </TouchableOpacity>
//                                                             </View>
//                                                         )
//                                                     )}
//                                                 </View>
//                                             )}
//                                         </View>
//                                     )
//                                 )}
//                             </View>
//                         )}
//                     </View>
//                 )
//             )}
//         </View>
//     )}
// </View>
// </View>
