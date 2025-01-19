package utils;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

import ch.qos.logback.core.subst.Token;

@Component
public class JwtUtils {

    // Clave secreta para firmar los tokens
    @Value("${security.jwt.key.private}")
    private String claveSecreta;

    // Duración del token
    @Value("${security.jwt.key.expiration}")
    private long expiracion;

    /*
     * Generar un token JWT a partir del nombre del usuario, luego indicamos la fecha de creación y de expiración,
     * y por último firmamos el token con la clave secreta utilizando el algoritmo de encriptación especificado. 
     * @param username nombre del usuario
     * @return token JWT
     */
    public String generateToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiracion))
                .sign(Algorithm.HMAC256(claveSecreta));
    }


    /*
     * Extraer el nombre del usuario del token JWT
     * @param token JWT
     * @return nombre del usuario
     */
    public String extractUsername(String token){
        try{
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(claveSecreta))
                    .build()
                    .verify(token);

            return decodedJWT.getSubject();
        }catch(JWTDecodeException e){
            throw new RuntimeException("Error al decodificar el token JWT: " + e.getMessage());
        }
    }

    /*
     * Validar el token JWT
     * @param token JWT
     * @return true si el token es válido, false en caso contrario
     */
    public boolean validateToken(String token) {
        try {
            JWT.require(Algorithm.HMAC256(claveSecreta))
                    .build()
                    .verify(token);
            return true;
        } catch (SignatureVerificationException e) {
            System.out.println("Error: La firma del token JWT no es válida.");
        } catch (TokenExpiredException e) {
            System.out.println("Error: El token JWT ha expirado.");
        } catch (Exception e) {
            System.out.println("Error al verificar el token JWT: " + e.getMessage());
        }
        return false;
    }
}
