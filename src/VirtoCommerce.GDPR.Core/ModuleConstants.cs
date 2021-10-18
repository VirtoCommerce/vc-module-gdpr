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
                public const string Access = "GDPRModule:access";
                public const string Create = "GDPRModule:create";
                public const string Read = "GDPRModule:read";
                public const string Update = "GDPRModule:update";
                public const string Delete = "GDPRModule:delete";

                public static string[] AllPermissions { get; } = { Read, Create, Access, Update, Delete };
            }
        }

        public static class Settings
        {
            public static class General
            {
                public static SettingDescriptor GDPRModuleEnabled { get; } = new SettingDescriptor
                {
                    Name = "GDPRModule.GDPRModuleEnabled",
                    GroupName = "GDPRModule|General",
                    ValueType = SettingValueType.Boolean,
                    DefaultValue = false
                };

                public static SettingDescriptor GDPRModulePassword { get; } = new SettingDescriptor
                {
                    Name = "GDPRModule.GDPRModulePassword",
                    GroupName = "GDPRModule|Advanced",
                    ValueType = SettingValueType.SecureString,
                    DefaultValue = "qwerty"
                };

                public static IEnumerable<SettingDescriptor> AllSettings
                {
                    get
                    {
                        yield return GDPRModuleEnabled;
                        yield return GDPRModulePassword;
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
