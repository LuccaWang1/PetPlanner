import unittest
import server

# Automated Tests Are Particularly Good For:
# -- Testing things that “should work”
# -- Testing the edge cases (anticipate the unexpected)
# -- New things don’t break things that were working (“regression”)

# Running DocTests
# Don't want print statements in code, bc they will break it
# Write in the terminal:
# $ python3 -m doctest server.py
# $ (nothing output for success) - if this is the output, everything worked!

# Unit Tests:
class ValidationTestCase(unittest.TestCase):
    """Unit tests for server validation functions."""

    # best practices to only do one assert or test in each method
    # each method is one unit test

    def test_is_valid_login(self):
        """Checking user email and password for validation at login."""

        user_login = {"email": "test_email", "password": "password"} #create a dict w/ keys
        self.assertTrue(server.is_valid_login(user_login))

    def test_not_is_valid_login(self):
        """Tests whether the 'is_valid_login' function correctly identifies an invalid login attempt when the password is missing."""

        user_login = {"email": "test_email"} #create a dict w/ keys
        self.assertFalse(server.is_valid_login(user_login))


if __name__ == "__main__":
    # If called like a script, run our tests
    unittest.main(verbosity=2)
