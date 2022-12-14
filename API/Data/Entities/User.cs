using Microsoft.AspNetCore.Identity;

namespace API.Data.Entities
{
    public class User : IdentityUser
    {
        public string CustomerId { get; set; }

        //public string FirstName { get; set; }
        //public string LastName { get; set; }
    }
}