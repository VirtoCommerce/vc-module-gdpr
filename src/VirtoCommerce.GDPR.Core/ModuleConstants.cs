namespace VirtoCommerce.GDPR.Core
{
    public static class ModuleConstants
    {
        public static class Security
        {
            public static class Permissions
            {
                public const string Access = "gdpr:access";
                public const string Anonymize = "gdpr:anonymize";
                public const string Download = "gdpr:download";

                public static string[] AllPermissions { get; } = { Access, Anonymize, Download };
            }
        }
    }
}
