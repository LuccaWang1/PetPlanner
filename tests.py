import unittest
import server 

#Automated Tests Are Particularly Good For:
#-- Testing things that “should work”
#-- Testing the edge cases (anticipate the unexpected)
#-- New things don’t break things that were working (“regression”)

#Running DocTests
#Don't want print statements in code, bc they will break it
#Write in the terminal: 
#$ python3 -m doctest server.py
#$ (nothing output for success) - if this is the output, everything worked!

#Unit Tests:
class ValidationTestCase(unittest.TestCase):
    """Unit tests for server validation functions."""

    #best practices to only do one assert or test in each method 

    def test_is_valid_login(self): #each method is one unit test 
        user_login = {"email": "test_email", "password": "password"} #create a dict w/ keys 
        self.assertTrue(server.is_valid_login(user_login))

    def test_not_is_valid_login(self):
        user_login = {"email": "test_email"} #create a dict w/ keys 
        self.assertFalse(server.is_valid_login(user_login))


#Integration Test:
#Can a user create an account?
#Can a user log into their account?


#Functional Test:
#Does the add a pet modal work to create a pet in the db?
#Does the add a pet model work to create the pet on the dashboard in a pet card?

#Does the add an event modal work to create an event in the db?
#Does the add an event model work to create the event on the calendar of the My Events webpage?

#Does the add a specialist modal work to create a specialist in the db?
        

if __name__ == "__main__":
    # If called like a script, run our tests
    unittest.main(verbosity=2)