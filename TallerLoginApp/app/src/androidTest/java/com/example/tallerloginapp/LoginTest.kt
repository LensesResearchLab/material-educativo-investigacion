package com.example.tallerloginapp

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class LoginTest {

    // 1. REGLA DE COMPOSE: Inicia la UI antes de cada test
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun loginExitoso_debeMostrarMensajeVerde() {
        // 2. SETUP: Cargamos la pantalla
        composeTestRule.setContent {
            LoginScreen()
        }

        // 3. INTERACCIÓN (Act)
        // Usamos los testTags que definimos en el Módulo 1.
        // onNodeWithTag busca en el árbol semántico.

        composeTestRule.onNodeWithTag("username_input")
            .performTextInput("admin")

        composeTestRule.onNodeWithTag("password_input")
            .performTextInput("1234")

        composeTestRule.onNodeWithTag("login_button")
            .performClick()

        // 4. ASERCIÓN (Assert)
        // Esperamos que aparezca el nodo con el mensaje y verificamos su texto.
        composeTestRule.onNodeWithTag("result_message")
            .assertIsDisplayed()
            .assertTextEquals("Login Exitoso")
    }

    @Test
    fun loginFallido_debeMostrarMensajeError() {
        composeTestRule.setContent { LoginScreen() }

        composeTestRule.onNodeWithTag("username_input").performTextInput("hacker")
        composeTestRule.onNodeWithTag("password_input").performTextInput("password")
        composeTestRule.onNodeWithTag("login_button").performClick()

        composeTestRule.onNodeWithTag("result_message")
            .assertIsDisplayed()
            .assertTextEquals("Credenciales Incorrectas")
    }
}
