import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    body: {
        display: "flex",
        backgroundColor:"white",
        height:"100%",
        color:"white"
      },
      card: {
        // padding: 10,
        display: "flex",
        flex: 1,
        height:"100%"
        
        
      },
      button: {
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
        marginBottom: 10,
        padding: 20,
      },
      accButton:{
        height: 125,     
        width: 125,     
        position: 'relative',         
        borderRadius:200,
        borderWidth: 6,    
        display:'flex',     
        justifyContent:'center',     
        alignItems:'center',
        padding: 36,
        margin: 10,
        borderColor:'#F1F1F1'
        
      },
      text: {
        display:"flex",
        fontSize: 24,
        lineHeight: 28,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
        marginBottom: 10,
      },
      box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems:'center',
        
      },
      container: {
        margin: 15,
        borderWidth: 0,
        flexDirection: "row",
        display: "flex",
        alignItems: 'center',
      },
      row: {
        padding: 0,
        flex: 1,
        textAlign: "center",
        
        
      },
      centeredIcon: {
        textAlign: "center",
      },
      tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "red",
        textAlign: "center",
        padding: 0,
        resizeMode : "cover",
        alignSelf:'center'
      },
})