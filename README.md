# Pinvest-Mern
A full stack inventory and management app using MERN. After creating the account, user have can add,edit,delete the inventory in store. Store will also display the total category of items, total value in store and out of stock inventories.

![Screenshot from 2023-01-14 09-38-35](https://user-images.githubusercontent.com/63155782/212449995-2466cea2-dc49-472d-a7be-2683b78922b2.png)

# User

## Register
First, you have to register using a valid email. 
Note - Use a valid email to reset your password or get your password in case you forgot it(the app will send mail).

![Screenshot from 2023-01-14 09-44-31](https://user-images.githubusercontent.com/63155782/212450168-ac6e3095-f7ad-4ff6-82dc-d607b7aec03a.png)

## Logout
Login or logout functionality is implemented using JSONWebTokens. After the user clicks on login, a JSONWebToken will be created(which will expire automatically after 24 hrs). After the user clicks on logout, the app will expire the token; hence user gets logout.

## Change Password
User can change the password by inputting the old and new passwords.

![Screenshot from 2023-01-14 09-55-59](https://user-images.githubusercontent.com/63155782/212450543-fe4854df-9d7c-489e-b7e6-9d4d677b5580.png)

## Forgot Password
Users can reset their password by entering a valid email if they forget it. The app will send a link via mail after clicking, and the user can reset the password.

![Screenshot from 2023-01-14 09-57-24](https://user-images.githubusercontent.com/63155782/212450593-c15fd9b2-b964-45bc-835c-0433842c5913.png)
![Screenshot from 2023-01-14 10-00-29](https://user-images.githubusercontent.com/63155782/212450672-8fc5aac1-f032-492f-98ae-d110b22b4883.png)


# Product

## Add Product
After login, you can add the inventory.You have to fill a form. Add name,category,quantity,price,bio and image for the product.

![Screenshot from 2023-01-14 09-45-54](https://user-images.githubusercontent.com/63155782/212450252-33ceb0b8-49ec-4b7a-8b08-a17d4d82c09f.png)

## Edit Product
Same as add product, you can also edit the product(name,price,quantity,image).

## Delete Product
You can click on delete button(in action column of each product). You get a pop-up to confirm delete the product.

![Screenshot from 2023-01-14 09-49-19](https://user-images.githubusercontent.com/63155782/212450346-02ff9010-fac7-4d80-9195-a75f9d2348c0.png)

## View Product
User can view the product by clicking on view button.

![Screenshot from 2023-01-14 09-50-48](https://user-images.githubusercontent.com/63155782/212450411-d9bae43c-1c50-43ec-99d7-a508de428c00.png)




