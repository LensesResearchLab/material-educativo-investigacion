package com.example.tallerloginapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {

    // EL SABOTAJE: Una lista estática que vivirá para siempre en la RAM
    companion object {
        val memoryLeakList = mutableListOf<ComponentActivity>()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // CULPABLE: Cada vez que se crea esta pantalla (ej. al rotar el teléfono),
        // nos guardamos a nosotros mismos en la lista estática.
        // Nunca nos borramos de la lista al destruir la pantalla (onDestroy).
        memoryLeakList.add(this)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    LoginScreen()
                }
            }
        }
    }
}

@Composable
fun LoginScreen() {
    // ESTADO: Variables reactivas que guardan lo que escribe el usuario
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Bienvenido al Taller", style = MaterialTheme.typography.headlineMedium)

        Spacer(modifier = Modifier.height(32.dp))

        // INPUT USUARIO
        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("Usuario") },
            modifier = Modifier
                .fillMaxWidth()
                .testTag("username_input") // <--- ID para Automation
        )

        Spacer(modifier = Modifier.height(16.dp))

        // INPUT PASSWORD
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Contraseña") },
            modifier = Modifier
                .fillMaxWidth()
                .testTag("password_input") // <--- ID para Automation
        )

        Spacer(modifier = Modifier.height(32.dp))

        // BOTÓN LOGIN
        Button(
            onClick = {
                // LÓGICA DE NEGOCIO SIMPLIFICADA
                if (username == "admin" && password == "1234") {
                    message = "Login Exitoso"
                } else {
                    message = "Credenciales Incorrectas"
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .testTag("login_button") // <--- ID para Automation
        ) {
            Text("Ingresar")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // MENSAJE DE RESULTADO (Aserción Visual)
        if (message.isNotEmpty()) {
            Text(
                text = message,
                color = if (message == "Login Exitoso") MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                modifier = Modifier.testTag("result_message") // <--- ID para comprobar el resultado
            )
        }
    }
}
