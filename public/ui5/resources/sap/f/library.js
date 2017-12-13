/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/library","sap/m/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"sap.f",version:"1.48.13",dependencies:["sap.ui.core","sap.m"],types:["sap.f.LayoutType"],controls:["sap.f.Avatar","sap.f.DynamicPage","sap.f.DynamicPageHeader","sap.f.DynamicPageTitle","sap.f.FlexibleColumnLayout","sap.f.semantic.SemanticPage"],elements:["sap.f.semantic.AddAction","sap.f.semantic.CloseAction","sap.f.semantic.CopyAction","sap.f.semantic.DeleteAction","sap.f.semantic.DiscussInJamAction","sap.f.semantic.ExitFullScreenAction","sap.f.semantic.FavoriteAction","sap.f.semantic.FlagAction","sap.f.semantic.FooterMainAction","sap.f.semantic.FullScreenAction","sap.f.semantic.MessagesIndicator","sap.f.semantic.NegativeAction","sap.f.semantic.PositiveAction","sap.f.semantic.PrintAction","sap.f.semantic.SemanticButton","sap.f.semantic.SemanticControl","sap.f.semantic.SemanticToggleButton","sap.f.semantic.SendEmailAction","sap.f.semantic.SendMessageAction","sap.f.semantic.ShareInJamAction","sap.f.semantic.TitleMainAction"]});sap.f.LayoutType={OneColumn:"OneColumn",TwoColumnsBeginExpanded:"TwoColumnsBeginExpanded",TwoColumnsMidExpanded:"TwoColumnsMidExpanded",MidColumnFullScreen:"MidColumnFullScreen",ThreeColumnsMidExpanded:"ThreeColumnsMidExpanded",ThreeColumnsEndExpanded:"ThreeColumnsEndExpanded",ThreeColumnsMidExpandedEndHidden:"ThreeColumnsMidExpandedEndHidden",ThreeColumnsBeginExpandedEndHidden:"ThreeColumnsBeginExpandedEndHidden",EndColumnFullScreen:"EndColumnFullScreen"};sap.ui.lazyRequire("sap.f.routing.Router");sap.ui.lazyRequire("sap.f.routing.Target");sap.ui.lazyRequire("sap.f.routing.TargetHandler");sap.ui.lazyRequire("sap.f.routing.Targets");sap.f.AvatarShape={Circle:"Circle",Square:"Square"};sap.f.AvatarSize={XS:"XS",S:"S",M:"M",L:"L",XL:"XL",Custom:"Custom"};sap.f.AvatarType={Icon:"Icon",Image:"Image",Initials:"Initials"};sap.f.AvatarImageFitType={Cover:"Cover",Contain:"Contain"};return sap.f;});
