// Box.js  
import React from "react";  
import PropTypes from "prop-types"; // Importa PropTypes para validação de props  
import { View, Text } from "react-native";   
import styles from "./styles"; // Importa os estilos definidos em styles.js  

// Componente Box que recebe children como prop  
export default function Box({ children }) {  
    return (  
        <View style={styles.box}>  
            {/* Texto dentro da caixa, aplicando os estilos definidos em styles.boxText e exibindo o children recebido */}  
            <Text style={styles.boxText}>{children}</Text>  
        </View>  
    );  
}  

// Define os tipos das props esperadas pelo componente Box  
Box.propTypes = {  
    // children deve ser um nó renderizável e é obrigatório  
    children: PropTypes.node.isRequired,  
};  