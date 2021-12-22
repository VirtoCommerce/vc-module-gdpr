using System.Collections.Generic;
using VirtoCommerce.Platform.Core.Settings;

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

        public static class Settings
        {
            public static class General
            {
                public static SettingDescriptor GDPRPassword { get; } = new SettingDescriptor
                {
                    Name = "GDPR.GDPRPassword",
                    GroupName = "GDPR|Advanced",
                    ValueType = SettingValueType.SecureString,
                    DefaultValue = "qwerty"
                };

                public static IEnumerable<SettingDescriptor> AllSettings
                {
                    get
                    {
                        yield return GDPRPassword;
                    }
                }
            }

            public static IEnumerable<SettingDescriptor> AllSettings
            {
                get
                {
                    return General.AllSettings;
                }
            }
        }
    }
}
